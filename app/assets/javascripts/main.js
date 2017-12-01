"use strict";

// function to test es6
let log = (message) => {
    console.log(message);
};

class ArcInputForm {

    constructor() {
        this.commands = [];
        this.textarea = document.getElementById('arc-text-input');
        this.screen   = document.getElementById('arc-text-output');

        let obj = this;

        $('.arc-action').on('click', (e) => {
            obj.addCommand(e.target.dataset.command);
        });

        $('#arc-submit').on('click', (e) => {
            let data = {
                commands: obj.commandString,
                text: obj.inputText
            };

            $.ajax({
                type: 'POST',
                url: '/api/v1/text_operations/run_commands',
                data: data,
                success: function(data){ obj.submitCallback(data) },
                error: function (err) {
                    console.log(err);
                    alert("Unable to connect");
                },
                dataType: 'json'
            });
        });
    }

    get commandString() {
        return this.commands.join('|');
    }

    addCommand(cmd) {
        if (!this.commands.includes(cmd)) {
            this.commands.push(cmd);
        }
    }

    get inputText() {
        return this.textarea.value;
    }

    set inputText(text) {
        this.textarea.value = text;
    }

    set outputScreen(text) {
        this.screen.innerText = text;
    }

    submitCallback(data) {
        if (data.status == 'ok') {
            this.outputScreen = data.data;
        } else if (data.status == 'error') {
            alert(data.message);
        } else {
            alert(data.message);
        }
    }
}


$(document).ready( () => {
        new ArcInputForm();
    }
);
