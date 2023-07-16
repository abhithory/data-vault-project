export const DataVaultJson = {
    "_format": "hh-sol-artifact-1",
    "contractName": "DataVault",
    "sourceName": "contracts/DataVault.sol",
    "abi": [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "enum DataVault.DataType",
            "name": "dataType",
            "type": "uint8"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "fileHash",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "decryptKey",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "uploadTime",
            "type": "uint256"
          }
        ],
        "name": "DataAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "enum DataVault.DataType",
                "name": "dataType",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "dataName",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "dataHash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "decryptKey",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "uploadTime",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataVault.DataStruct",
            "name": "_data",
            "type": "tuple"
          }
        ],
        "name": "addData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllData",
        "outputs": [
          {
            "components": [
              {
                "internalType": "enum DataVault.DataType",
                "name": "dataType",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "dataName",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "dataHash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "decryptKey",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "uploadTime",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataVault.DataStruct[]",
            "name": "allData",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "userAllDataCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "enum DataVault.DataType",
            "name": "_dataType",
            "type": "uint8"
          }
        ],
        "name": "userSpecifcDataCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b50610fa4806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80632d10fa28146100515780635e8107061461006f578063909fc07e1461008d578063da58cb45146100a9575b600080fd5b6100596100d9565b60405161006691906108a4565b60405180910390f35b6100776103e2565b60405161008491906108d5565b60405180910390f35b6100a760048036038101906100a29190610b74565b61042b565b005b6100c360048036038101906100be9190610bbd565b61051e565b6040516100d091906108d5565b60405180910390f35b606060006100e56103e2565b90508067ffffffffffffffff81111561010157610100610909565b5b60405190808252806020026020018201604052801561013a57816020015b6101276105fd565b81526020019060019003908161011f5790505b50915060005b818110156103dd576000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020818154811061019857610197610bea565b5b90600052602060002090600502016040518060a00160405290816000820160009054906101000a900460ff1660038111156101d6576101d561066a565b5b60038111156101e8576101e761066a565b5b81526020016001820180546101fc90610c48565b80601f016020809104026020016040519081016040528092919081815260200182805461022890610c48565b80156102755780601f1061024a57610100808354040283529160200191610275565b820191906000526020600020905b81548152906001019060200180831161025857829003601f168201915b5050505050815260200160028201805461028e90610c48565b80601f01602080910402602001604051908101604052809291908181526020018280546102ba90610c48565b80156103075780601f106102dc57610100808354040283529160200191610307565b820191906000526020600020905b8154815290600101906020018083116102ea57829003601f168201915b5050505050815260200160038201805461032090610c48565b80601f016020809104026020016040519081016040528092919081815260200182805461034c90610c48565b80156103995780601f1061036e57610100808354040283529160200191610399565b820191906000526020600020905b81548152906001019060200180831161037c57829003601f168201915b505050505081526020016004820154815250508382815181106103bf576103be610bea565b5b602002602001018190525080806103d590610ca8565b915050610140565b505090565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050905090565b428160800181815250506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548160ff021916908360038111156104c8576104c761066a565b5b021790555060208201518160010190816104e29190610e9c565b5060408201518160020190816104f89190610e9c565b50606082015181600301908161050e9190610e9c565b5060808201518160040155505050565b6000806105296103e2565b90506000805b828110156105f25784600381111561054a5761054961066a565b5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020828154811061059a57610599610bea565b5b906000526020600020906005020160000160009054906101000a900460ff1660038111156105cb576105ca61066a565b5b036105df5781806105db90610ca8565b9250505b80806105ea90610ca8565b91505061052f565b508092505050919050565b6040518060a001604052806000600381111561061c5761061b61066a565b5b8152602001606081526020016060815260200160608152602001600081525090565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600481106106aa576106a961066a565b5b50565b60008190506106bb82610699565b919050565b60006106cb826106ad565b9050919050565b6106db816106c0565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561071b578082015181840152602081019050610700565b60008484015250505050565b6000601f19601f8301169050919050565b6000610743826106e1565b61074d81856106ec565b935061075d8185602086016106fd565b61076681610727565b840191505092915050565b6000819050919050565b61078481610771565b82525050565b600060a0830160008301516107a260008601826106d2565b50602083015184820360208601526107ba8282610738565b915050604083015184820360408601526107d48282610738565b915050606083015184820360608601526107ee8282610738565b9150506080830151610803608086018261077b565b508091505092915050565b600061081a838361078a565b905092915050565b6000602082019050919050565b600061083a8261063e565b6108448185610649565b9350836020820285016108568561065a565b8060005b858110156108925784840389528151610873858261080e565b945061087e83610822565b925060208a0199505060018101905061085a565b50829750879550505050505092915050565b600060208201905081810360008301526108be818461082f565b905092915050565b6108cf81610771565b82525050565b60006020820190506108ea60008301846108c6565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61094182610727565b810181811067ffffffffffffffff821117156109605761095f610909565b5b80604052505050565b60006109736108f0565b905061097f8282610938565b919050565b600080fd5b6004811061099657600080fd5b50565b6000813590506109a881610989565b92915050565b600080fd5b600080fd5b600067ffffffffffffffff8211156109d3576109d2610909565b5b6109dc82610727565b9050602081019050919050565b82818337600083830152505050565b6000610a0b610a06846109b8565b610969565b905082815260208101848484011115610a2757610a266109b3565b5b610a328482856109e9565b509392505050565b600082601f830112610a4f57610a4e6109ae565b5b8135610a5f8482602086016109f8565b91505092915050565b610a7181610771565b8114610a7c57600080fd5b50565b600081359050610a8e81610a68565b92915050565b600060a08284031215610aaa57610aa9610904565b5b610ab460a0610969565b90506000610ac484828501610999565b600083015250602082013567ffffffffffffffff811115610ae857610ae7610984565b5b610af484828501610a3a565b602083015250604082013567ffffffffffffffff811115610b1857610b17610984565b5b610b2484828501610a3a565b604083015250606082013567ffffffffffffffff811115610b4857610b47610984565b5b610b5484828501610a3a565b6060830152506080610b6884828501610a7f565b60808301525092915050565b600060208284031215610b8a57610b896108fa565b5b600082013567ffffffffffffffff811115610ba857610ba76108ff565b5b610bb484828501610a94565b91505092915050565b600060208284031215610bd357610bd26108fa565b5b6000610be184828501610999565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610c6057607f821691505b602082108103610c7357610c72610c19565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610cb382610771565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610ce557610ce4610c79565b5b600182019050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302610d527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610d15565b610d5c8683610d15565b95508019841693508086168417925050509392505050565b6000819050919050565b6000610d99610d94610d8f84610771565b610d74565b610771565b9050919050565b6000819050919050565b610db383610d7e565b610dc7610dbf82610da0565b848454610d22565b825550505050565b600090565b610ddc610dcf565b610de7818484610daa565b505050565b5b81811015610e0b57610e00600082610dd4565b600181019050610ded565b5050565b601f821115610e5057610e2181610cf0565b610e2a84610d05565b81016020851015610e39578190505b610e4d610e4585610d05565b830182610dec565b50505b505050565b600082821c905092915050565b6000610e7360001984600802610e55565b1980831691505092915050565b6000610e8c8383610e62565b9150826002028217905092915050565b610ea5826106e1565b67ffffffffffffffff811115610ebe57610ebd610909565b5b610ec88254610c48565b610ed3828285610e0f565b600060209050601f831160018114610f065760008415610ef4578287015190505b610efe8582610e80565b865550610f66565b601f198416610f1486610cf0565b60005b82811015610f3c57848901518255600182019150602085019450602081019050610f17565b86831015610f595784890151610f55601f891682610e62565b8355505b6001600288020188555050505b50505050505056fea2646970667358221220594f0dd4185925e0b8749d4e2b6a308d261ab68c39a5e5166960d546e88ff04164736f6c63430008120033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b506004361061004c5760003560e01c80632d10fa28146100515780635e8107061461006f578063909fc07e1461008d578063da58cb45146100a9575b600080fd5b6100596100d9565b60405161006691906108a4565b60405180910390f35b6100776103e2565b60405161008491906108d5565b60405180910390f35b6100a760048036038101906100a29190610b74565b61042b565b005b6100c360048036038101906100be9190610bbd565b61051e565b6040516100d091906108d5565b60405180910390f35b606060006100e56103e2565b90508067ffffffffffffffff81111561010157610100610909565b5b60405190808252806020026020018201604052801561013a57816020015b6101276105fd565b81526020019060019003908161011f5790505b50915060005b818110156103dd576000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020818154811061019857610197610bea565b5b90600052602060002090600502016040518060a00160405290816000820160009054906101000a900460ff1660038111156101d6576101d561066a565b5b60038111156101e8576101e761066a565b5b81526020016001820180546101fc90610c48565b80601f016020809104026020016040519081016040528092919081815260200182805461022890610c48565b80156102755780601f1061024a57610100808354040283529160200191610275565b820191906000526020600020905b81548152906001019060200180831161025857829003601f168201915b5050505050815260200160028201805461028e90610c48565b80601f01602080910402602001604051908101604052809291908181526020018280546102ba90610c48565b80156103075780601f106102dc57610100808354040283529160200191610307565b820191906000526020600020905b8154815290600101906020018083116102ea57829003601f168201915b5050505050815260200160038201805461032090610c48565b80601f016020809104026020016040519081016040528092919081815260200182805461034c90610c48565b80156103995780601f1061036e57610100808354040283529160200191610399565b820191906000526020600020905b81548152906001019060200180831161037c57829003601f168201915b505050505081526020016004820154815250508382815181106103bf576103be610bea565b5b602002602001018190525080806103d590610ca8565b915050610140565b505090565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050905090565b428160800181815250506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548160ff021916908360038111156104c8576104c761066a565b5b021790555060208201518160010190816104e29190610e9c565b5060408201518160020190816104f89190610e9c565b50606082015181600301908161050e9190610e9c565b5060808201518160040155505050565b6000806105296103e2565b90506000805b828110156105f25784600381111561054a5761054961066a565b5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020828154811061059a57610599610bea565b5b906000526020600020906005020160000160009054906101000a900460ff1660038111156105cb576105ca61066a565b5b036105df5781806105db90610ca8565b9250505b80806105ea90610ca8565b91505061052f565b508092505050919050565b6040518060a001604052806000600381111561061c5761061b61066a565b5b8152602001606081526020016060815260200160608152602001600081525090565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600481106106aa576106a961066a565b5b50565b60008190506106bb82610699565b919050565b60006106cb826106ad565b9050919050565b6106db816106c0565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561071b578082015181840152602081019050610700565b60008484015250505050565b6000601f19601f8301169050919050565b6000610743826106e1565b61074d81856106ec565b935061075d8185602086016106fd565b61076681610727565b840191505092915050565b6000819050919050565b61078481610771565b82525050565b600060a0830160008301516107a260008601826106d2565b50602083015184820360208601526107ba8282610738565b915050604083015184820360408601526107d48282610738565b915050606083015184820360608601526107ee8282610738565b9150506080830151610803608086018261077b565b508091505092915050565b600061081a838361078a565b905092915050565b6000602082019050919050565b600061083a8261063e565b6108448185610649565b9350836020820285016108568561065a565b8060005b858110156108925784840389528151610873858261080e565b945061087e83610822565b925060208a0199505060018101905061085a565b50829750879550505050505092915050565b600060208201905081810360008301526108be818461082f565b905092915050565b6108cf81610771565b82525050565b60006020820190506108ea60008301846108c6565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61094182610727565b810181811067ffffffffffffffff821117156109605761095f610909565b5b80604052505050565b60006109736108f0565b905061097f8282610938565b919050565b600080fd5b6004811061099657600080fd5b50565b6000813590506109a881610989565b92915050565b600080fd5b600080fd5b600067ffffffffffffffff8211156109d3576109d2610909565b5b6109dc82610727565b9050602081019050919050565b82818337600083830152505050565b6000610a0b610a06846109b8565b610969565b905082815260208101848484011115610a2757610a266109b3565b5b610a328482856109e9565b509392505050565b600082601f830112610a4f57610a4e6109ae565b5b8135610a5f8482602086016109f8565b91505092915050565b610a7181610771565b8114610a7c57600080fd5b50565b600081359050610a8e81610a68565b92915050565b600060a08284031215610aaa57610aa9610904565b5b610ab460a0610969565b90506000610ac484828501610999565b600083015250602082013567ffffffffffffffff811115610ae857610ae7610984565b5b610af484828501610a3a565b602083015250604082013567ffffffffffffffff811115610b1857610b17610984565b5b610b2484828501610a3a565b604083015250606082013567ffffffffffffffff811115610b4857610b47610984565b5b610b5484828501610a3a565b6060830152506080610b6884828501610a7f565b60808301525092915050565b600060208284031215610b8a57610b896108fa565b5b600082013567ffffffffffffffff811115610ba857610ba76108ff565b5b610bb484828501610a94565b91505092915050565b600060208284031215610bd357610bd26108fa565b5b6000610be184828501610999565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610c6057607f821691505b602082108103610c7357610c72610c19565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610cb382610771565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610ce557610ce4610c79565b5b600182019050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302610d527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610d15565b610d5c8683610d15565b95508019841693508086168417925050509392505050565b6000819050919050565b6000610d99610d94610d8f84610771565b610d74565b610771565b9050919050565b6000819050919050565b610db383610d7e565b610dc7610dbf82610da0565b848454610d22565b825550505050565b600090565b610ddc610dcf565b610de7818484610daa565b505050565b5b81811015610e0b57610e00600082610dd4565b600181019050610ded565b5050565b601f821115610e5057610e2181610cf0565b610e2a84610d05565b81016020851015610e39578190505b610e4d610e4585610d05565b830182610dec565b50505b505050565b600082821c905092915050565b6000610e7360001984600802610e55565b1980831691505092915050565b6000610e8c8383610e62565b9150826002028217905092915050565b610ea5826106e1565b67ffffffffffffffff811115610ebe57610ebd610909565b5b610ec88254610c48565b610ed3828285610e0f565b600060209050601f831160018114610f065760008415610ef4578287015190505b610efe8582610e80565b865550610f66565b601f198416610f1486610cf0565b60005b82811015610f3c57848901518255600182019150602085019450602081019050610f17565b86831015610f595784890151610f55601f891682610e62565b8355505b6001600288020188555050505b50505050505056fea2646970667358221220594f0dd4185925e0b8749d4e2b6a308d261ab68c39a5e5166960d546e88ff04164736f6c63430008120033",
    "linkReferences": {},
    "deployedLinkReferences": {}
  }
  
