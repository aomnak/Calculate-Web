import { describe, it, vi, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./Form";

describe("Form Component", () => {
  const handleCalculate = vi.fn(); // Mock function

  it("should load and display the form correctly", () => {
    render(<Form onCalculate={handleCalculate} />);
    const button = screen.getByRole("button", { name: "Calculate" });
    expect(button).toBeDefined();
  });

  it("should call handleCalculate with correct result when form is submitted", async () => {
    render(<Form onCalculate={handleCalculate} />);

    const input1 = screen.getByLabelText("input1") as HTMLInputElement;
    const input2 = screen.getByLabelText("input2") as HTMLInputElement;
    const oper = screen.getByLabelText("oper") as HTMLSelectElement;
    const button = screen.getByRole("button", { name: "Calculate" });

    const testCases = [
      { val1: "10", val2: "1", operation: "+", expected: 11 },
      { val1: "10", val2: "1", operation: "-", expected: 9 },
      { val1: "10", val2: "1", operation: "*", expected: 10 },
      { val1: "10", val2: "1", operation: "/", expected: 10 },
      { val1: "10", val2: "0", operation: "/", expected: "Error" }, // Division by zero
    ];

    for (const { val1, val2, operation, expected } of testCases) {
      fireEvent.change(input1, { target: { value: val1 } });
      fireEvent.blur(input1);
      fireEvent.change(input2, { target: { value: val2 } });
      fireEvent.blur(input2);
      fireEvent.change(oper, { target: { value: operation } });

      await waitFor(() => expect(button.hasAttribute("disabled")).toBe(false));

      fireEvent.click(button);
      await waitFor(() => expect(handleCalculate).toBeCalledWith(expected));
    }
  });

  it("should disable Calculate button if input is invalid", async () => {
    render(<Form onCalculate={handleCalculate} />);
    const button = screen.getByRole("button", { name: "Calculate" }) as HTMLButtonElement;
    
    await waitFor(() => expect(button.hasAttribute("disabled")).toBe(true));
  });

  it("should display error if input fields are emptied after calculation", async () => {
    render(<Form onCalculate={handleCalculate} />);

    const input1 = screen.getByLabelText("input1") as HTMLInputElement;
    const input2 = screen.getByLabelText("input2") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "Calculate" }) as HTMLButtonElement;

    // ✅ 1. กรอกค่าเข้าไปก่อน
    fireEvent.change(input1, { target: { value: "10" } });
    fireEvent.blur(input1);

    fireEvent.change(input2, { target: { value: "5" } });
    fireEvent.blur(input2);

    // ✅ 2. กดปุ่ม "Calculate"
    fireEvent.click(button);

    // ✅ 3. รอให้ handleCalculate ถูกเรียก
    await waitFor(() => expect(handleCalculate).toBeCalledWith(15));

    // ✅ 4. ล้างค่าหลังจากคำนวณเสร็จ
    fireEvent.change(input1, { target: { value: "" } });
    fireEvent.blur(input1);

    fireEvent.change(input2, { target: { value: "" } });
    fireEvent.blur(input2);

    // ✅ 5. Debug UI เพื่อดูว่า error message ขึ้นหรือไม่
    console.log(screen.debug());

    // ✅ 6. ใช้ waitFor() เพื่อให้ Formik อัปเดต UI
    await waitFor(() => {
      const error1 = screen.getByText("Input 1 is required");
      expect(error1).toBeDefined();
    });

    await waitFor(() => {
      const error2 = screen.getByText("Input 2 is required");
      expect(error2).toBeDefined();
    });

    // ✅ 7. ปุ่มต้องถูกปิดใช้งาน
    await waitFor(() => expect(button.hasAttribute("disabled")).toBe(true));
});


  
});
