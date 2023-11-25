import { Angle } from "../Angle";
export declare class Random {
    static Float(max: number): number;
    static Float(min: number, max: number): number;
    static Integer(max: number): number;
    static Integer(min: number, max: number): number;
    static Color(): string;
    static Boolean(): boolean;
    static Angle(degree?: number): Angle;
}
