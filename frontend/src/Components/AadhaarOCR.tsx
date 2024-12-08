import * as React from 'react';
import upload from '../assets/cloud-upload.png';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

interface AadhaarInfo {
    dob: string | null;
    aadhaarNumber: string | null;
    gender: string | null;
    name: string | null;
    address: string | null;
    pincode: string | null;
}

const AadhaarOCR: React.FC = () => {

    const [loading, setIsLoading] = React.useState<boolean>(false);
    const [idData, setIsData] = React.useState<boolean>(false);
    const [parsedData, setParsedData] = React.useState<AadhaarInfo>({
        dob: null,
        aadhaarNumber: null,
        gender: null,
        name: null,
        address: null,
        pincode: null,
    });
    const [frontImage, setFrontImage] = React.useState<File | null>(null);
    const [backImage, setBackImage] = React.useState<File | null>(null);

    const frontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFrontImage(file);
        }
    };

    const backUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setBackImage(file);
        }
    };

    const handleSubmit = async () => {
        if (!frontImage || !backImage) {
            alert('Please upload both front and back images.');
            return;
        }
        setIsLoading(true);

        const formData = new FormData();
        formData.append('frontImage', frontImage);
        formData.append('backImage', backImage);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/parse-aadhar`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            console.log(response.data.data.data, '---------response')
            if (response.data.success) {
                setIsLoading(false);
                setIsData(true)
                setParsedData(response.data.data.data)
            }
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    const InputField: React.FC<{ label: string; value: string | null }> = ({ label, value }) => (
        <div className="relative z-0 w-full mb-5 group">
            <input
                type="text"
                value={value || ''}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                readOnly
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {label}
            </label>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen bg-white shadow-md">
            <div className="flex flex-col w-full md:w-1/2 p-8 space-y-8 justify-center bg-white shadow-md">
                <div className="flex flex-col border-2 border-dashed border-gray-300 h-72 rounded-lg justify-center p-4 items-center cursor-pointer hover:border-blue-500 transition-colors duration-300">
                    <h2 className="font-semibold text-lg pb-3">Aadhaar Front</h2>
                    {frontImage ? (
                        <img src={URL.createObjectURL(frontImage)} alt="Aadhaar Front Preview" className="mx-auto my-2 h-40 w-full object-contain" />
                    ) : (
                        <img src={upload} alt="upload" className="mx-auto my-2 h-20 w-20 object-contain" />
                    )}

                    <label className="text-blue-500 rounded-xl mt-4 cursor-pointer">
                        Click here to Upload/Capture
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={frontUpload}
                        />
                    </label>
                </div>

                <div className="flex flex-col border-2 border-dashed border-gray-300 h-72 rounded-lg justify-center p-4 items-center cursor-pointer hover:border-blue-500 transition-colors duration-300">
                    <h2 className="font-semibold text-lg pb-3">Aadhaar Back</h2>
                    {backImage ? (
                        <img src={URL.createObjectURL(backImage)} alt="Aadhaar Back Preview" className="mx-auto my-2 h-40 w-full object-contain" />
                    ) : (
                        <img src={upload} alt="upload" className="mx-auto my-2 h-20 w-20 object-contain" />
                    )}

                    <label className="text-blue-500 rounded-xl mt-4 cursor-pointer">
                        Click here to Upload/Capture
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={backUpload}
                        />
                    </label>
                </div>

                <div className="w-full">
                    {loading ? (
                        <div className="border rounded-lg p-4 w-full bg-blue-300 flex justify-center items-center">
                            <CircularProgress />
                        </div>
                    ) : (
                        <button
                            className="border rounded-lg p-4 w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                            onClick={handleSubmit}
                        >
                            Parse Data
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col w-full md:w-1/2 p-8 bg-white shadow-md justify-center items-center">
                <h2 className="font-semibold text-xl mb-6 font-sans">Parsed Aadhaar Data</h2>
                {idData ? (
                    <div className="space-y-4 w-full border-4 p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Aadhaar Number : " value={parsedData.aadhaarNumber} />
                            <InputField label="Aadhaar Name : " value={parsedData.name} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Date of Birth : " value={parsedData.dob} />
                            <InputField label="Gender : " value={parsedData.gender} />
                        </div>
                        <InputField label="Address : " value={parsedData.address} />
                        {/* <InputField label="Pin Code : " value={parsedData.pincode} /> */}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center text-gray-500">
                        No data parsed yet. Please upload Aadhaar card to parse data.
                        <iframe className="h-72" src="https://lottie.host/embed/fc3bf61a-2796-40f5-94de-3b4bb1749edc/B1KxEpdPs5.json"></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AadhaarOCR;
