load('api_uart.js');
load('api_sys.js');

let k30 = {
    uartNo: 1,
    tx: 26,
    rx: 25,
    cmd_read: '\xfe\x04\x00\x00\x00\x04\xe5\xc6',
    cmd_abc_par: '\xfe\x03\x00\x1f\x00\x01\xa1\xc3',
    cmd_abc_off: '\xFE\x06\x00\x1F\x00\x00\xAC\x03',
    cmd_abc_on: '\xFE\x06\x00\x1F\x00\xB4\xAC\x74',

    // k30.init(1,25,24) init uart 
    init: function () { // rx25, tx26 https://github.com/cesanta/mongoose-os/blob/bf38f0a4796c6c26888420bd21dcd8ebed518e3a/fw/platforms/esp32/src/esp32_uart.c#L228
        
            UART.setConfig(k30.uartNo, { // Configure UART at 9600 baud    
                baudRate: 9600,
                esp32: {
                    gpio: {
                        rx: k30.rx,
                        tx: k30.tx,
                    },
                },
            });

        UART.setRxEnabled(k30.uartNo, true);
        k30.readCO2();
    },

    //enable ABC  
    abc_on: function () { //default period 180h period
        UART.write(k30.uartNo, k30.cmd_abc_on);
        let data = UART.read(k30.uartNo);
        if (data === k30.cmd_abc_on) {
            return {
                msg: "ABC function enabled 180 hours/ eq 7,5 days",
                raw_data: JSON.stringify([data.at(0), data.at(1), data.at(2), data.at(3), data.at(4), data.at(5), data.at(6)]),
            };
        } else return 'error';
    },

    abc_off: function () {
        UART.write(k30.uartNo, k30.cmd_abc_off);
        let data = UART.read(k30.uartNo);
        if (data === k30.cmd_abc_off) {
            return {
                msg: "ABC function Disabled",
                raw_data: JSON.stringify([data.at(0), data.at(1), data.at(2), data.at(3), data.at(4), data.at(5), data.at(6), data.at(7)]),
            };
        } else return 'error';
    },

    readCO2: function () {
        UART.write(k30.uartNo, k30.cmd_read);
        if (UART.readAvail(k30.uartNo) > 10) {
            let data = UART.read(k30.uartNo);
            if (data) {
                return (data.at(9) << 8) | data.at(10);
            } else return 'error';

        } else return 'error retry reqest';

    },
};