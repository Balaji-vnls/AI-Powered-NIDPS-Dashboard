import React, { useState } from 'react';
import { UploadIcon, FileTextIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
interface UploadInterfaceProps {
  onDataUploaded: () => void;
}
const UploadInterface: React.FC<UploadInterfaceProps> = ({
  onDataUploaded
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState('');
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  const handleFile = (file: File) => {
    setFileName(file.name);
    setUploading(true);
    // Simulate file upload
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      setUploading(false);
      setUploadStatus(success ? 'success' : 'error');
      if (success) {
        onDataUploaded();
      }
      // Reset status after a delay
      setTimeout(() => {
        setUploadStatus('idle');
        setFileName('');
      }, 3000);
    }, 1500);
  };
  return <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Upload Network Data
      </h3>
      <div className={`border-2 border-dashed rounded-lg p-6 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-colors duration-200 ease-in-out`} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
        <div className="text-center">
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-700">
                {uploadStatus === 'idle' ? <>
                    <span className="text-blue-600 hover:text-blue-500">
                      Upload a file
                    </span>{' '}
                    or drag and drop
                  </> : uploadStatus === 'success' ? <span className="text-green-600 flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 mr-1" />
                    Upload successful!
                  </span> : <span className="text-red-600 flex items-center justify-center">
                    <XCircleIcon className="h-5 w-5 mr-1" />
                    Upload failed. Try again.
                  </span>}
              </span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileInput} accept=".csv,.pcap" />
            </label>
            <p className="mt-1 text-xs text-gray-500">
              CSV or PCAP files up to 50MB
            </p>
          </div>
          {(uploading || fileName) && <div className="mt-4">
              <div className="flex items-center">
                <FileTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">{fileName}</span>
              </div>
              {uploading && <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>}
            </div>}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Supported File Types:
        </h4>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• Network Packet Captures (PCAP)</li>
          <li>• Preprocessed CSV Files</li>
          <li>• Network Flow Logs</li>
          <li>• Firewall Logs</li>
        </ul>
      </div>
    </div>;
};
export default UploadInterface;