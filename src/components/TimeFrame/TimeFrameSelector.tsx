import React, { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { FiCalendar, FiChevronDown, FiCheck, FiClock } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import "react-datepicker/dist/react-datepicker.css";

interface TimeFrameOption {
  value: string;
  label: string;
  description: string;
}

interface TimeFrameSelectorProps {
  selectedTimeRange: string;
  onTimeRangeChange: (value: string) => void;
}

const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({
  selectedTimeRange,
  onTimeRangeChange,
}) => {
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const timeFrames: TimeFrameOption[] = [
    {
      value: '24h',
      label: 'Daily (24h)',
      description: 'View data from the last 24 hours'
    },
    {
      value: '7d',
      label: 'Weekly (7d)',
      description: 'View data from the last 7 days'
    },
    {
      value: '30d',
      label: 'Monthly (30d)',
      description: 'View data from the last 30 days'
    },
    {
      value: '90d',
      label: 'Quarterly (90d)',
      description: 'View data from the last 90 days'
    },
    {
      value: '1y',
      label: 'Annually (1y)',
      description: 'View data from the last year'
    }
  ];

  const selectedOption = timeFrames.find(tf => tf.value === selectedTimeRange) || timeFrames[0];

  const handleCustomRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      // Convert to a custom range string format
      const range = `custom_${start.toISOString()}_${end.toISOString()}`;
      onTimeRangeChange(range);
    }
  };

  return (
    <div className="relative z-10">
      <Listbox value={selectedTimeRange} onChange={onTimeRangeChange}>
        {({ open: _open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <span className="flex items-center">
                  <FiClock className="mr-2 h-5 w-5 text-gray-400" />
                  <span className="block truncate">{selectedOption.label}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <FiChevronDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <AnimatePresence>
                    {timeFrames.map((timeFrame, index) => (
                      <Listbox.Option
                        key={timeFrame.value}
                        value={timeFrame.value}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center"
                            data-tooltip-id={`tooltip-${timeFrame.value}`}
                            data-tooltip-content={timeFrame.description}
                          >
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <FiCheck className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {timeFrame.label}
                            </span>
                            <Tooltip id={`tooltip-${timeFrame.value}`} />
                          </motion.div>
                        )}
                      </Listbox.Option>
                    ))}
                    <div className="px-3 py-2 border-t">
                      <button
                        onClick={() => setIsCustomRange(!isCustomRange)}
                        className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                      >
                        <FiCalendar className="mr-2" />
                        Custom Range
                      </button>
                      {isCustomRange && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2"
                        >
                          <DatePicker
                            selected={startDate}
                            onChange={handleCustomRangeChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            className="w-full"
                          />
                        </motion.div>
                      )}
                    </div>
                  </AnimatePresence>
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default TimeFrameSelector;
