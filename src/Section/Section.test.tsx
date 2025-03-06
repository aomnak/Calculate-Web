import { describe, it, vi, expect } from "vitest"
import {fireEvent, render, screen} from "@testing-library/react"
import Section from "./Section";

describe('calculater', () => {

    const handleDelete = vi.fn(); //mock fn [ไม่มีตัวตนอยู่จริง] ไม่ต้องสร้าง fn จริง ๆ 

    it('load and display', () => {
    render(<Section counters={[12]} onRemove={handleDelete}/>);

    //screen คือแทนหน้าเว็บ
    //ดึงปุ่มออกมาจาก getByRole
    const button = screen.getByRole("button", {name : "Remove"});
    expect(button).toBeDefined();

    });
    it('should call onRemove when clicking the remove button', () => { //arrange
    render(<Section counters={[12]} onRemove={handleDelete}/>);
    const button = screen.getByRole("button", {name : "Remove"});
    fireEvent.click(button); //act
    expect(handleDelete).toBeCalled(); //assert
        
    });

});