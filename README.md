# Mongoose OS library for K30 CO2 SENSOR


Mongoose OS api for CO2 Air Quality sensor (CO2 meter).

![K30](https://cdn.shopify.com/s/files/1/0019/5952/products/K-30-CO2-Sensor_354x.jpg?v=1530214985)

## Getting Started

1. Download and install [Mongoose OS].
2. You have a complete [documentation] and [video] tutorials about Mongoose OS.


## Usage of K30 Library
```js
load('api_rpc.js');
load('api_k30.js');
load('api_gpio.js');

let pin = 12; //push button pin

k30.init(1); //init Sensor

//press button and display Co2 Level
GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 300, function () {
    let co2level = k30.readCO2();
    print('Co2 level:', JSON.stringify(co2level));
}, null);

// PRC handler 
RPC.addHandler('co2', function (args) {
    return {
        co2: k30.readCO2()
    };
});

```

> **Note:**

## Example of Library

See [example].

[ViliusKraujutis]: <https://github.com/GeorgK/MQ135/blob/master/MQ135.cpp>

[documentation]: <https://mongoose-os.com/docs/>

[Mongoose OS]: <https://mongoose-os.com/software.html>

[video]: <https://mongoose-os.com/video-tutorials.html>

[example]: <https://github.com/mongoose-os-apps/mq135>
