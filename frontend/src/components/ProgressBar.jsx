import React from 'react';
import { Check } from 'lucide-react';

const ProgressSteps = (props) => {

    return (
        <div className="relative w-145 flex justify-between mt-3 pb-11 border-b-2 border-gray-200">
          {props.steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center mt-4">
              <div className={
                `w-8 h-8  rounded-full flex items-center justify-center transition duration-100 ease-in-out
                ${index < props.currentStep ? 'bg-[#4A3AFF] text-white font-bold' : 'bg-[#EFF0F6]'}
                `}>
                {index + 1 < props.currentStep ? (
                  <Check size={20} strokeWidth={3}/>
                  ) : (
                  <span className="text-[15px] font-semibold">{step.number}</span>
                  )}
                  
              </div>

              {index < (props.steps.length - 1) && (
                <div className=' absolute top-1/2 left-10 w-33 h-1'>
                  <div className={`absolute h-full w-full rounded-full  bg-gray-300`}></div>
                  <div className={`absolute h-full w-0 rounded-full bg-[#4A3AFF]
                  ${(index + 1) == props.currentStep ? 'transition-all duration-500 ease-in-out w-[50%]' : ''}
                  ${index < props.currentStep - 1 ? 'transition-all duration-100 ease-in-out w-full' : ''}`}
                  ></div>
                </div>
              )}
              <p className='absolute top-10 text-sm'>{props.steps[index].label}</p>
            </div>
          ))}
        </div>
      );
};
 
export default ProgressSteps;
