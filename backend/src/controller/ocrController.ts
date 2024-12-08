import { Request, Response } from 'express';
import { extractTextFromImage } from '../utils/tesseract'
import extractAadhaarInfo from '../utils/extractAdharInfo';
import AadhaarInfo from '../interface/iAadhaar';
import AadharModel from '../model/aadhaarinfo';

const ocrController = async (req: Request, res: Response) => {
    try {
        
        console.log('function called')
        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined

        if (!files) {
            res.status(400).json({ status: false, message: "No files were uploaded." });
            return;
        }

        const frontImage = files['frontImage']?.[0];
        const backImage = files['backImage']?.[0];

        const frontData = await extractTextFromImage(frontImage.buffer);
        const backData = await extractTextFromImage(backImage.buffer);

        if (!files || !files['frontImage']?.[0] || !files['backImage']?.[0]) {
            res.status(400).json({ status: false, message: "Both front and back images are required." });
        }

        const data = await extractAadhaarInfo(frontData, backData);
        if (data.data) saveDetails(data.data);

        res.status(200).json({ success: true, message: 'Data parsed successful', data })

    } catch (error) {
        console.log('Error in the orc controller ->', error);
    }
}

const saveDetails = async (aadhaarData: AadhaarInfo) => {
    try {
        const aadhaarRecordFound = await AadharModel.findOne({ aadhaarNumber: aadhaarData.aadhaarNumber });

        if (!aadhaarRecordFound) {
            const aadhaarRecord = new AadharModel(aadhaarData);
            const result = await aadhaarRecord.save();
            console.log('Data saved successfully:', result);
        } else {
            console.log('Aadhaar record already exists');
        }
    } catch (error) {
        console.error('Error saving data:', error);
        throw new Error('Error saving Aadhaar data');
    }
};

export default ocrController