import { FaCloudUploadAlt, FaFileAlt, FaFileUpload, FaUpload } from "react-icons/fa";

interface FileInputInterface {
  handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text:string;
  className?:string;
}


export function FileInput(props: FileInputInterface) {


  return (
    <label className={`flex flex-col items-center px-4 py-4 bg-primary text-text-color rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white ${props.className}`}>
      <FaCloudUploadAlt className="text-2xl" />
      <span className="mt-2 text-lg">{props.text}</span>
      <input type='file' className="hidden" onChange={props.handleSelectFile} />
    </label>
  );
}