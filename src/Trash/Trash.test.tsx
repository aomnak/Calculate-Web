import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Trash from "./Trash";

describe("Trash Component", () => {
    const handleRestore = vi.fn();

    it("should display 'No deleted items' when trash is empty", () => {
        render(<Trash trashItems={[]} onRestore={handleRestore} />);

        expect(screen.getByText("No deleted items")).toBeDefined();
    });

    it("should display deleted items", () => {
        render(<Trash trashItems={[12, "Test Item"]} onRestore={handleRestore} />);

        expect(screen.getByText("12")).toBeDefined();
        expect(screen.getByText("Test Item")).toBeDefined();
    });

    it("should call onRestore when clicking the restore button", () => {
        render(<Trash trashItems={[12]} onRestore={handleRestore} />);

        const button = screen.getByRole("button", { name: "Restore" });
        fireEvent.click(button);

        expect(handleRestore).toHaveBeenCalledTimes(1);
        expect(handleRestore).toHaveBeenCalledWith(0);
    });
});
