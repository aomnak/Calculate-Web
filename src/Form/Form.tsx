import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

interface FormProps {
  onCalculate: (result: number | string) => void;
}

const Form: React.FC<FormProps> = ({ onCalculate }) => {
  const formik = useFormik({
    initialValues: {
      input1: "",
      input2: "",
      operation: "+",
    },
    validationSchema: yup.object().shape({
      input1: yup.number().required("Input 1 is required"),
      input2: yup.number().required("Input 2 is required"),
      operation: yup
        .string()
        .oneOf(["+", "-", "*", "/"], "Invalid operation")
        .required("Operation is required"),
    }),
    onSubmit: (values) => {
      const num1 = Number(values.input1);
      const num2 = Number(values.input2);
      const operation = values.operation;

      let result: number | string = 0;

      switch (operation) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "/":
          result = num2 !== 0 ? num1 / num2 : "Error";
          break;
      }

      onCalculate(result);
    },
  });

  return (
    <div className="card">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="number"
          value={formik.values.input1}
          onChange={formik.handleChange}
          name="input1"
          placeholder="Input 1"
          aria-label="input1"
        />
        {formik.touched.input1 && formik.errors.input1 && (
          <h4 style={{ color: "red" }}>{formik.errors.input1}</h4>
        )}

        <select
          onChange={formik.handleChange}
          value={formik.values.operation}
          name="operation"
          aria-label="oper"
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>

        <input
          type="number"
          value={formik.values.input2}
          onChange={formik.handleChange}
          name="input2"
          placeholder="Input 2"
          aria-label="input2"
        />
        {formik.touched.input2 && formik.errors.input2 && (
          <h4 style={{ color: "red" }}>{formik.errors.input2}</h4>
        )}

        <button type="submit" disabled={!formik.isValid || !formik.dirty}>
          Calculate
        </button>
      </form>
    </div>
  );
};


// const Form: FC<FormProps> = ({ onCalculate }) => {
//   const [input1, setInput1] = useState<string>(""); // ✅ เก็บค่าเป็น string
//   const [input2, setInput2] = useState<string>(""); // ✅ เก็บค่าเป็น string
//   const [operation, setOperation] = useState<string>("+");

//   const onChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInput1(event.target.value); // ✅ ไม่แปลงเป็น number ทันที
//   };

//   const onChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInput2(event.target.value); // ✅ ไม่แปลงเป็น number ทันที
//   };

//   const onChange3 = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setOperation(event.target.value);
//   };

//   const calculateResult = () => {
//     const num1 = input1 === "" ? 0 : Number(input1); // ✅ แปลงเป็น number ตอนคำนวณ
//     const num2 = input2 === "" ? 0 : Number(input2);
  
//     let result: number | string;
//     switch (operation) {
//       case "+":
//         result = num1 + num2;
//         break;
//       case "-":
//         result = num1 - num2;
//         break;
//       case "*":
//         result = num1 * num2;
//         break;
//       case "/":
//         result = num2 !== 0 ? num1 / num2 : "Error";
//         break;
//       default :
//         result = 0;
//     }

//     onCalculate(result);
//   };

//   return (
//     <div className="card">
//       <input type="number" value={input1} onChange={onChange1} placeholder="Input 1" aria-label="input1" />
//       <select onChange={onChange3} value={operation} aria-label="oper">
//         <option value="+">+</option>
//         <option value="-">-</option>
//         <option value="*">×</option>
//         <option value="/">÷</option>
//       </select>
//       <input type="number" value={input2} onChange={onChange2} placeholder="Input 2" aria-label="input2"/>

//       <button onClick={calculateResult}>Calculate</button>
//     </div>
//   );
// };

export default Form;
