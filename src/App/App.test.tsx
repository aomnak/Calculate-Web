import { describe, it,expect } from "vitest";
import { render, screen, fireEvent} from "@testing-library/react";
import App from "./App";

describe('App Component', () => {

    it('should display result', () => {
        render(<App/>);
        const button = screen.getByRole("button", { name: "Calculate" });
        expect(button).toBeDefined();

        const input1 = screen.getByLabelText("input1") as HTMLInputElement;
        const input2 = screen.getByLabelText("input2") as HTMLInputElement;
        const oper = screen.getByLabelText("oper") as HTMLSelectElement;
        
        // Test addition
        fireEvent.change(input1, { target: { value: "10" } });
        fireEvent.change(input2, { target: { value: "1" } });
        fireEvent.change(oper, { target: { value: "+" } });
        fireEvent.click(button);

    });

    it('should be able to delete', () => {
        render(<App/>);
        const button = screen.getByRole("button", { name: "Calculate" });
        expect(button).toBeDefined();

        const input1 = screen.getByLabelText("input1") as HTMLInputElement;
        const input2 = screen.getByLabelText("input2") as HTMLInputElement;
        const oper = screen.getByLabelText("oper") as HTMLSelectElement;
        
        // Test addition
        fireEvent.change(input1, { target: { value: "10" } });
        fireEvent.change(input2, { target: { value: "1" } });
        fireEvent.change(oper, { target: { value: "+" } });
        fireEvent.click(button);

        const removebutton = screen.getByRole("button", { name: "Remove" });
        fireEvent.click(removebutton);
        expect(removebutton).toBeDefined();
    });

    it('should be able to restore', () => {
        render(<App/>);
        const button = screen.getByRole("button", { name: "Calculate" });
        expect(button).toBeDefined();

        const input1 = screen.getByLabelText("input1") as HTMLInputElement;
        const input2 = screen.getByLabelText("input2") as HTMLInputElement;
        const oper = screen.getByLabelText("oper") as HTMLSelectElement;
        
        // Test addition
        fireEvent.change(input1, { target: { value: "10" } });
        fireEvent.change(input2, { target: { value: "1" } });
        fireEvent.change(oper, { target: { value: "+" } });
        fireEvent.click(button);

        const removebutton = screen.getByRole("button", { name: "Remove" });
        fireEvent.click(removebutton);
        expect(removebutton).toBeDefined();

        const restorebutton = screen.getByRole("button", { name: "Restore" });
        fireEvent.click(restorebutton);
        expect(restorebutton).toBeDefined();
    })
});