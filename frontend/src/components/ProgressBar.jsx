import React, { useState } from 'react';

const ProgressSteps = () => {
    const [steps, setStep] = useState([
        {
            number: 1,
            label: 'record'
        },
        {
            number: 2,
            label: 'model'
        },
        {
            number: 3,
            label: 'transcript'
        },
        {
            number: 4,
            label: 'ata'
        }
    ]) 

    return (
        <div className="w-140 flex justify-between m-auto px-5 mt-5">
          {steps.map((step) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center mt-4">
              <div className="w-10 h-10 rounded-full bg-[#EFF0F6] flex items-center justify-center transition duration-400 ease-in-out">
                <span className="text-[19px] text-[#6F6C90] font-light">{step.number}</span>
              </div>
            </div>
          ))}
        </div>
      );
};
 
export default ProgressSteps;
