﻿import { bgColor, cssHeight, gridArea, gridRow, gridTemplate, zIndex } from "../html/css.js";
import { onClick, onMouseOut, onMouseOver } from "../html/evts.js";
import { Div } from "../html/tags.js";
import { User } from "../User.js";
import { FormDialog } from "./FormDialog.js";

const newRowColor = bgColor("lightgreen");
const hoveredColor = bgColor("rgba(65, 255, 202, 0.25)");
const unhoveredColor = bgColor("transparent");
const avatarSize = cssHeight("32px");
const warpToEvt = Object.assign(
    new Event("warpTo"),
    {
        id: null
    });

const ROW_TIMEOUT = 3000;

export class UserDirectoryForm extends FormDialog {

    constructor() {
        super("users", "Users");

        const _ = (evt) => () => this.dispatchEvent(evt);

        /** @type {Map.<string, Element[]>} */
        this.rows = new Map();

        this.content.append(
            this.table = Div(
                gridTemplate(
                    ["auto", "1fr"],
                    ["min-content"], {
                    columnGap: "5px",
                    width: "100%"
                })));
    }

    /**
     * 
     * @param {User} user
     */
    set(user, isNew = false) {
        this.delete(user.id);
        const row = this.rows.size + 1;

        if (isNew) {
            const elem = Div(
                gridArea(1, row, 2, 1),
                zIndex(-1),
                newRowColor);
            setTimeout(() => {
                this.table.removeChild(elem);
            }, ROW_TIMEOUT);
            this.table.append(elem);
        }

        let avatar = "N/A";
        if (user.avatar && user.avatar.element) {
            avatar = user.avatar.element;
            avatarSize.apply(avatar);
        }

        const elems = [
            Div(gridArea(1, row), zIndex(0), avatar),
            Div(gridArea(2, row), zIndex(0), user.displayName),
            Div(
                gridArea(1, row, 2, 1), zIndex(1),
                unhoveredColor,
                onMouseOver(function () {
                    hoveredColor.apply(this);
                }),
                onMouseOut(function () {
                    unhoveredColor.apply(this);
                }),
                onClick(() => {
                    this.hide();
                    warpToEvt.id = user.id;
                    this.dispatchEvent(warpToEvt);
                }))];

        this.rows.set(user.id, elems);
        this.table.append(...elems);
    }

    delete(userID) {
        if (this.rows.has(userID)) {
            const elems = this.rows.get(userID);
            this.rows.delete(userID);
            for (let elem of elems) {
                this.table.removeChild(elem);
            }

            let rowCount = 1;
            for (let elems of this.rows.values()) {
                const r = gridRow(rowCount++);
                for (let elem of elems) {
                    r.apply(elem);
                }
            }
        }
    }

    clear() {
        for (let id of this.rows.keys()) {
            this.delete(id);
        }
    }

    warn(...rest) {
        const elem = Div(
            gridArea(1, this.rows.size + 1, 2, 1),
            bgColor("yellow"),
            ...rest.map(i => i.toString()));

        this.table.append(elem);

        setTimeout(() => {
            this.table.removeChild(elem);
        }, 5000);
    }
}