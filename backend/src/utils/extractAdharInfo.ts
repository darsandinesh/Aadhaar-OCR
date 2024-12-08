import AadhaarInfo from "../interface/iAadhaar";

const extractAadhaarInfo = (frontText: string, backText: string): Promise<{ data?: AadhaarInfo }> => {
    try {

        const cleanText = (text: string) => text.replace(/\s+/g, ' ').trim();

        const cleanFrontText = cleanText(frontText);
        const cleanBackText = cleanText(backText);

        const info: AadhaarInfo = {
            dob: null,
            aadhaarNumber: null,
            gender: null,
            name: null,
            address: null,
        };

        const dobPattern = /(?:Date of Birth|DOB) ?:? *(\d{2}\/\d{2}\/\d{4})/i;
        const dobMatch = cleanFrontText.match(dobPattern);
        info.dob = dobMatch ? dobMatch[1] : null;

        const aadhaarPattern = /(\d{4} \d{4} \d{4})/;
        const aadhaarMatch = cleanFrontText.match(aadhaarPattern);
        info.aadhaarNumber = aadhaarMatch ? aadhaarMatch[1] : null;

        const genderPattern = /\b(Male|Female)\b/i;
        const genderMatch = cleanFrontText.match(genderPattern);
        info.gender = genderMatch ? genderMatch[1] : null;

        const namePattern = /Government of India.*?\s([A-Z\s]+)\s*[>|<]/;
        const nameMatch = cleanFrontText.match(namePattern);
        console.log(cleanFrontText)
        console.log(nameMatch)
        info.name = nameMatch ? nameMatch[1] : null;


        const addressPattern = /Address:\s*([\s\S]*?)(?:\d{6}|$)/i;
        const addressMatch = cleanBackText.match(addressPattern);
        if (addressMatch) {
            info.address = cleanText(addressMatch[1])
                .replace(/[^\w\s,.-]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        }


        return Promise.resolve({ data: info });
    } catch (error) {
        console.error('Error extracting Aadhaar information:', error);
        return Promise.reject({ message: 'An error occurred while extracting Aadhaar information' });
    }
};

export default extractAadhaarInfo;
