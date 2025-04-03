import Script from 'next/script';
import config from '../../config.json';

interface AdProps {
    auto: boolean;
    slot: string;
    responsive: boolean;
    width?: string; // optional width prop
    height?: string; // optional height prop
}

const AdComponent = ({ auto, slot, responsive, width, height }: AdProps) => (
    <div className="w-full max-w-full text-center">
        {config.GOOGLE_ADSENSE && (

        <>
    
        </>
        )}
    </div>
);

export default AdComponent;
