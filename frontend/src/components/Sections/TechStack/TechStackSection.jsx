import React from "react";

const TechStackSection = () => {
  return (
    <section className=" text-text-color text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className=" p-4 rounded shadow border-2 border-primary-hover">
            <h3 className="text-xl font-bold mb-2">Frontend</h3>
            <ul>
              <li>Next.js (TypeScript)</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
            </ul>
          </div>
          <div className=" p-4 rounded shadow border-2 border-primary-hover">
            <h3 className="text-xl font-bold mb-2">Smart Contracts</h3>
            <ul>
              <li>Solidity</li>
              <li>Hardhat</li>
              <li>Deployed on Polygon blockchain</li>
            </ul>
          </div>
          <div className="p-4 rounded shadow border-2 border-primary-hover">
            <h3 className="text-xl font-bold mb-2">Storing Data</h3>
            <ul>
              <li>IPFS</li>
              <li>(InterPlanetary File System)</li>
            </ul>
          </div>
        </div>
    </section>
  );
};

export default TechStackSection;
