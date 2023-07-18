import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" border-t-2 border-primary-hover py-4 w-full px-16">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-white">&copy; {(new Date().getFullYear())} DataVault. </p>
        <div className="flex items-center">
          <p className="text-white mr-2"></p>
          <a href="https://github.com/abhithory/data-vault-project" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaGithub className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;