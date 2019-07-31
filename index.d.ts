// Type definitions for dialog-node 0.2.0
// Project: dialog-node
// Definitions by: Marek Lukas (tajnymag) <https://github.com/Tajnymag>

export as namespace dialogNode;

export interface Callback {
    (code: number, retVal: string, stderr: any): any;
}
export interface InternalCallback {
    (code: number, stdout: string, stderr: string, callback: Callback): void;
}

export function setCwd(dirname: string): void;
export function init(): void;

export function info(str: string, title: string, timeout: number, callback: Callback): void;
export function warn(str: string, title: string, timeout: number, callback: Callback): void;
export function error(str: string, title: string, timeout: number, callback: Callback): void;
export function question(str: string, title: string, timeout: number, callback: Callback): void;
export function entry(str: string, title: string, timeout: number, callback: Callback): void;
export function calendar(str: string, title: string, timeout: number, callback: Callback): void;
export function fileselect(str: string, title: string, timeout: number, callback: Callback): void;

export function debugprint(cmd: string[], args: string[], cb: Callback): void;
export function run(cmd: string[], cb: InternalCallback, callback: Callback): void;
