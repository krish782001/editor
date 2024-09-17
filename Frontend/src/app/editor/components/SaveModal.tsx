import React, { useState } from 'react';

interface SaveModalProps {
  onClose: () => void;
  onSave: (name: string, dataType: string) => void;
}

const SaveModal: React.FC<SaveModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('');

  const handleSave = () => {
    if (name && dataType) {
      onSave(name, dataType);
    }
  };

  const fieldNames = [
    'Text Field',
    'Number Field',
    'Phone Field',
    'Paragraph Field',
    'Password Field',
    'Textarea Field',
    'Date Field',
    'Datetime Field',
    'Email Field',
    'toggle_switch Field',
    'Url Field',
    'Decimal Field',
    'Percentage Field',
    'recaptcha Field',
    'document_sequence Field',
    'Dropdown Field',
    'Radio Field',
    'Checkbox Field',
    'Fileupload Field',
    'Imageupload Field',
    'Button Field',
    'Survey Field',
    'field_group Field',
    'Childform Field',
    'currency Field',
    'value_list Field',
    'dependent_dropdown Field',
    'qr_code Field',
    'bar_code Field',
    'communication Field',
    'Checkout Field',
    'Approved Field',
    'calculated_field Field',
    'section',
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl mb-4">Save Canvas</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </label>
        <label className="block mb-4">
          Data Type:
          <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="border p-2 rounded-md w-full"
          >
            <option value="" disabled>Select type</option>
            {fieldNames.map((fieldName, index) => (
              <option key={index} value={fieldName.toLowerCase().replace(' ', '')}>
                {fieldName}
              </option>
            ))}
          </select>
        </label>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded-md">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
