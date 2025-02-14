import React from 'react';
import { Check } from 'lucide-react';
{/* <div className="absolute top-10 left-0 w-full h-2 bg-gray-300 rounded-full"></div>


<div
  className="absolute top-10 left-0 h-2 bg-[#4A3AFF] rounded-full transition-all duration-500 ease-in-out"
  style={{
    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
  }}
></div> */}

const ProgressSteps = (props) => {

    return (
        <div className="relative w-145 flex justify-between mt-5 pb-8 border-b-2 border-gray-200">
          <div className={`absolute h-2 top-7 w-full bg-[#EFF0F6] rounded-full`}></div>
          <div className={`
            absolute h-2 top-7 max-w-140 bg-[#4A3AFF] rounded-full transition-all duration-500 ease-in-out`}
            style={{
              width: `${(((props.currentStep - 1) / (props.steps.length - 1)) * 100)}%`
            }}></div>


          {props.steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center mt-4">
              <div className={
                `w-8 h-8  rounded-full flex items-center justify-center transition duration-500 ease-in-out
                ${index < props.currentStep ? 'bg-[#4A3AFF] text-white font-bold' : 'bg-[#EFF0F6]'}
                `}>
                {index + 1 < props.currentStep ? (
                  <Check />
                  ) : (
                  <span className="text-[15px] font-semibold">{step.number}</span>
                  )}
              </div>

              {/* {index < (props.steps.length - 1) && (
                <div className='relative top-1/2 left-full w-32 h-1'>
                  <div className={`absolute h-full transition-colors duration-400 ${index < props.currentStep - 1 ? 'bg-[#4A3AFF]' : 'bg-gray-300'}`}></div>
                  <div className={`absolute h-full w-15 ${(index + 1) == props.currentStep ? 'bg-[#4A3AFF]' : 'w-32'}`}></div>
                </div>
              )} */}
              
            </div>
          ))}
          {/* <div className='absolute top-1/2  w-100 h-2 bg-gray-300 mt-1 ml-5 rounded-full'></div>
          <div className={`absolue top-1/2 h-2 bg-[#4A3AFF] rounded-full transition-all duration-500 ease-in-out`}></div> */}

          {/* <div className='absolute top-1/2 left-full w-32 h-1'>
            <div className={`h-full relative ${0 < props.currentStep - 1 ? '' : 'bg-gray-300'}`}>
              <div className={`h-full rounded-md bg-[#4A3AFF]  transition-all duration-500 ease-in-out ${
                (0 + 1) == props.currentStep ? ' w-15' : 'w-32'
                }`}>
                </div>
            </div>
          </div>          */}
        </div>
      );
};
 
export default ProgressSteps;
