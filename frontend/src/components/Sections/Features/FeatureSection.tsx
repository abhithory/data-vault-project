import React, { ReactElement } from 'react'
import FeatureItem from './FeatureItem'
import { JsxElement } from 'typescript';
import { FaCheckCircle, FaLock, FaSearchDollar, FaShieldAlt, FaUser } from 'react-icons/fa';
import { FiShield } from 'react-icons/fi';

function FeatureSection() {
    interface FeatureItemInterface{
        icon: ReactElement<any, any>
        heading: string;
        text: string;
    }
    const featuresData: FeatureItemInterface[] = [
            {
              icon: <FiShield className="text-3xl" />,
              heading: "Secure Storage",
              text: "Your data is encrypted and stored on the blockchain, ensuring its integrity and protection against unauthorized access",
            },
            {
              icon: <FaLock className="text-3xl" />,
              heading: "Advanced Encryption",
              text: "DataVault employs advanced encryption techniques to secure your data. Only you have the key to decrypt your information.",
            },
            {
              icon: <FaUser className="text-3xl" />,
              heading: "User-Friendly Interface",
              text: "DataVault offers a user-friendly interface that simplifies the management of your data.",
            },
            {
              icon: <FaShieldAlt className="text-3xl" />,
              heading: "Access Control",
              text: "By leveraging blockchain's inherent security features, DataVault ensures that only authorized individuals with the private key can access data",
            },
            {
              icon: <FaCheckCircle className="text-3xl" />,
              heading: "Data Integrity",
              text: "The immutable nature of the blockchain provides an extra layer of data integrity. Creating a transparent and auditable trail of modifications",
            },
          ];
    return (
        <div className="flex flex-wrap items-stretch gap-4 justify-center ">
            {featuresData.map((feature: FeatureItemInterface,key)=> {
                return (

                    <FeatureItem key={key} heading={feature.heading} text={feature.text} icon={feature.icon} />
                )
            })}
        </div>)
}

export default FeatureSection