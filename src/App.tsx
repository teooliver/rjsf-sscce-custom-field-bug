import { useEffect, useState } from 'react';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/bootstrap-4';
import { RJSFSchema, UiSchema, FieldProps, RegistryFieldsType } from '@rjsf/utils';
import { nanoid } from "nanoid";
import './App.css';


const IdGenerator = ({ formData, schema: { title, description }, name, onChange }: FieldProps) => {
  const [val, setVal] = useState<string>("");

  useEffect(() => {
    if (formData) {
      setVal(formData);
    } else {
      const id = nanoid();
      setVal(id);
      // If you remove the onChange call we can add items to the array as expected, 
      // otherwise it flickers the new item in and out.
      // onChange(id); 
    }
  }, [formData, onChange]);

  return (
    <div>
      <label htmlFor="id">ID:</label>
      <input type="text" id="id" name="id" value={val} disabled />
    </div>
  );
};


const schema: RJSFSchema = {
  "type": "object",
  "properties": {
    "categories": {
      "type": "array",
      "title": "Categories",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "title": "Id",
            "type": "string"
          },
          "text": {
            "type": "string",
            "title": "Text"
          },
        }
      }
    }
  }
}
const uiSchema: UiSchema = {
  "categories": {
    "items": {
      "id": {
        "ui:field": "idGenerator"
      }
    }
  }
};

const fields: RegistryFieldsType = { idGenerator: IdGenerator };


function App() {
  const log = (type: any) => console.log.bind(console, type);
  return (
    <div className="App">
      <p>
        Custom field `onChange` breaks "array" type in an schema
      </p>
      <div className="form">
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          fields={fields}
          onChange={log('changed')}
          onSubmit={log('submitted')}
          onError={log('errors')}
        />
      </div>
    </div>
  );
}

export default App;



