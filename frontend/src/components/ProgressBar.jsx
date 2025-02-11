import React from 'react';
import { Check } from 'lucide-react';

const ProgressSteps = (props) => {
    return (
        <div className="w-140 flex justify-between m-auto px-5 mt-5">
          {props.steps.map((step, index) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center mt-4">
              <div className={
                `w-10 h-10 rounded-full  flex items-center justify-center transition duration-400 ease-in-out
                ${index < props.currentStep ? 'bg-[#4A3AFF] text-white font-bold' : 'bg-[#EFF0F6]'}
                `}>
                {index + 1 < props.currentStep ? (
                  <Check />
                  ) : (
                  <span className="text-[17px]">{step.number}</span>
                  )}
              </div>

              {index < (props.steps.length - 1) && (
                <div className='absolute top-1/2 left-full w-32 h-1 transition duration-900 ease-out'>
                  <div className={`h-full ${index < props.currentStep - 1 ? 'bg-[#4A3AFF]' : 'bg-gray-300'}`}>
                    <div className={`h-full w-15 ${(index + 1) == props.currentStep ? 'bg-[#4A3AFF]' : ''}`}></div>
                  </div>
                </div>
              )}
              
            </div>
          ))}
        </div>
      );
};
 
export default ProgressSteps;
