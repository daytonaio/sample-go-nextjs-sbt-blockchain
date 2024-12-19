package main

import (
	"encoding/json"
	"fmt"

	"github.com/google/uuid"

	"github.com/p2eengineering/kalp-sdk-public/kalpsdk"
)

type SBTMetadata struct {
	Description  string `json:"description"`
	Name         string `json:"name,omitempty"`
	Organization string `json:"organization,omitempty"`
	DateOfIssue  string `json:"dateOfIssue,omitempty"`
}

type SoulboundToken struct {
	Owner    string `json:"owner"`
	TokenID  string `json:"tokenID"`
	Metadata string `json:"metadata"`
}

type SmartContract struct {
	kalpsdk.Contract
}

// Prefix to clearly demarcate Soulbound Token state in the ledger
const sbtPrefix = "soulboundToken"
const ownerMappingPrefix = "sbtOwnerMapping"

// Initialize - Sets the metadata and flags the contract as initialized
func (s *SmartContract) Initialize(sdk kalpsdk.TransactionContextInterface, description string) error {
	// Check if the contract has already been initialized
	initialized, err := sdk.GetState("initialized")
	if err != nil {
		return fmt.Errorf("failed to check contract initialization: %v", err)
	}
	if initialized != nil {
		return fmt.Errorf("contract is already initialized")
	}
	// var sbtMetadata SBTMetadata
	// sbtMetadata.Description = metadata
	// Create metadata struct
	sbtMetadata := SBTMetadata{
		Description: description,
	}
	// Marshal the struct (not the string directly)
	metadataJSON, err := json.Marshal(sbtMetadata)
	if err != nil {
		return fmt.Errorf("failed to marshal metadata during initialization: %v", err)
	}

	// Store metadata
	err = sdk.PutStateWithoutKYC("metadata", metadataJSON)
	if err != nil {
		return fmt.Errorf("failed to store metadata during initialization: %v", err)
	}

	// Mark the contract as initialized
	err = sdk.PutStateWithoutKYC("initialized", []byte("true"))
	if err != nil {
		return fmt.Errorf("failed to mark contract as initialized: %v", err)
	}

	return nil
}

// MintSBT - issues a new SBT
func (s *SmartContract) MintSBT(sdk kalpsdk.TransactionContextInterface, address string, name string, organization string, dateOfIssue string) error {
	// Generate a unique token ID (UUID)
	tokenID := uuid.New().String()

	// Retrieve metadata for description
	metadataJSON, err := sdk.GetState("metadata")
	if err != nil {
		return fmt.Errorf("failed to retrieve metadata: %v", err)
	}
	if metadataJSON == nil {
		return fmt.Errorf("contract metadata is not set")
	}

	var metadata SBTMetadata
	err = json.Unmarshal(metadataJSON, &metadata)
	if err != nil {
		return fmt.Errorf("failed to unmarshal metadata: %v", err)
	}

	// Check if the address already has an SBT
	mappingKey, err := sdk.CreateCompositeKey(ownerMappingPrefix, []string{address})
	if err != nil {
		return fmt.Errorf("failed to create composite key for owner mapping: %v", err)
	}
	existingTokenID, err := sdk.GetState(mappingKey)
	if err != nil {
		return fmt.Errorf("failed to check existing SBT for owner: %v", err)
	}
	if existingTokenID != nil {
		return fmt.Errorf("owner '%s' already has an SBT", address)
	}

	// Update metadata with additional details during minting
	metadata.Name = name
	metadata.Organization = organization
	metadata.DateOfIssue = dateOfIssue

	// Marshal the updated metadata
	updatedMetadataJSON, err := json.Marshal(metadata)
	if err != nil {
		return fmt.Errorf("failed to marshal updated metadata: %v", err)
	}

	// Create SBT object
	sbt := SoulboundToken{
		Owner:    address,
		TokenID:  tokenID,
		Metadata: string(updatedMetadataJSON),
	}
	sbtJSON, err := json.Marshal(sbt)
	if err != nil {
		return fmt.Errorf("failed to marshal SBT: %v", err)
	}

	// Composite key for the SBT itself
	compositeKey, err := sdk.CreateCompositeKey(sbtPrefix, []string{address, tokenID})
	if err != nil {
		return fmt.Errorf("failed to create composite key: %v", err)
	}

	// Store the SBT using the composite key
	err = sdk.PutStateWithoutKYC(compositeKey, sbtJSON)
	if err != nil {
		return fmt.Errorf("failed to store SBT: %v", err)
	}

	// Update the owner -> tokenID mapping
	err = sdk.PutStateWithoutKYC(mappingKey, []byte(tokenID))
	if err != nil {
		return fmt.Errorf("failed to update owner mapping: %v", err)
	}

	return nil
}

// QuerySBT - retrieves SBT details by its owner and tokenID
func (s *SmartContract) QuerySBT(sdk kalpsdk.TransactionContextInterface, owner string, tokenID string) (*SoulboundToken, error) {
	compositeKey, err := sdk.CreateCompositeKey(sbtPrefix, []string{owner, tokenID})
	if err != nil {
		return nil, fmt.Errorf("failed to create composite key: %v", err)
	}

	sbtJSON, err := sdk.GetState(compositeKey)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve SBT: %v", err)
	}
	if sbtJSON == nil {
		return nil, fmt.Errorf("SBT with owner '%s' and tokenID '%s' does not exist", owner, tokenID)
	}
	var sbt SoulboundToken
	err = json.Unmarshal(sbtJSON, &sbt)
	if err != nil {
		return nil, err
	}
	return &sbt, nil
}

// TransferSBT - blocks any transfer to enforce the soulbound nature
func (s *SmartContract) TransferSBT(sdk kalpsdk.TransactionContextInterface, from string, to string, tokenID string) error {
	return fmt.Errorf("soulbound tokens are not transferable")
}

// GetSBTByOwner - retrieves the TokenID associated with an owner
func (s *SmartContract) GetSBTByOwner(sdk kalpsdk.TransactionContextInterface, owner string) (*SoulboundToken, error) {
	// Construct the mapping key to get the TokenID
	mappingKey, err := sdk.CreateCompositeKey(ownerMappingPrefix, []string{owner})
	if err != nil {
		return nil, fmt.Errorf("failed to create composite key for owner mapping: %v", err)
	}
	tokenIDBytes, err := sdk.GetState(mappingKey)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve tokenID for owner '%s': %v", owner, err)
	}
	if tokenIDBytes == nil {
		return nil, fmt.Errorf("owner '%s' does not have an SBT", owner)
	}
	tokenID := string(tokenIDBytes)

	// Construct the key for the SBT data
	sbtKey, err := sdk.CreateCompositeKey(sbtPrefix, []string{owner, tokenID})
	if err != nil {
		return nil, fmt.Errorf("failed to create composite key for SBT: %v", err)
	}

	// Fetch SBT JSON data
	sbtJSON, err := sdk.GetState(sbtKey)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve SBT data: %v", err)
	}
	if sbtJSON == nil {
		return nil, fmt.Errorf("SBT not found for owner '%s' and tokenID '%s'", owner, tokenID)
	}

	// Unmarshal into an SBT object
	var sbt SoulboundToken
	err = json.Unmarshal(sbtJSON, &sbt)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal SBT data: %v", err)
	}

	return &sbt, nil
}

// GetAllTokenIDs - retrieves all SBT token IDs in the system
func (s *SmartContract) GetAllTokenIDs(sdk kalpsdk.TransactionContextInterface) ([]string, error) {
	// Get all states with the ownerMapping prefix
	iterator, err := sdk.GetStateByPartialCompositeKey(ownerMappingPrefix, []string{})
	if err != nil {
		return nil, fmt.Errorf("failed to get state iterator: %v", err)
	}
	defer iterator.Close()

	var tokenIDs []string
	for iterator.HasNext() {
		response, err := iterator.Next()
		if err != nil {
			return nil, fmt.Errorf("failed to get next state: %v", err)
		}

		// The value stored in the ownerMapping is the tokenID
		tokenID := string(response.Value)
		tokenIDs = append(tokenIDs, tokenID)
	}

	if len(tokenIDs) == 0 {
		return nil, fmt.Errorf("no SBTs found")
	}

	return tokenIDs, nil
}

func main() {
	chaincode, err := kalpsdk.NewChaincode(&SmartContract{})
	if err != nil {
		fmt.Printf("Error creating SBT chaincode: %v \n", err)
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting SBT chaincode: %v \n", err)
	}
}
