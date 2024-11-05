<div align="center">
  <img src="https://github.com/user-attachments/assets/8e4e3361-4930-45ef-addc-a0b576e8c56f" alt="logo" />
  <h1>Tsunagari/つながり - frontend</h1>
  
</div>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Startup](#startup)
- [Configuration](#configuration)
- [License](#license)

## Overview

**Tsunagari**(to connect) frontend is a React SPA for bridging tokens between **EVM** compatible chains.
<img src="https://github.com/user-attachments/assets/727d317a-6e47-4d10-95b1-cb2e8895c069" alt="screenshot" />



## Features

- The system uses **ethersjs** to interact with the blockchain.
- The system is easily extendable to support new evm chains.
- The system adopts cool 80s lava lamp design.

## Startup

Starting a local setup of Tsunagari: https://github.com/vlady-kotsev/tsunagari-local

## Configuration

Place `config.json` in `<root>/config/`

Example config:

```json
{
  "httpHost": "<tsunagari-backend-host>",
  "httpPort": "<tsunagari-backend-port>"
}
```

### Note

_Wagmi wasn't used for interacting with the smart contracts intentionally, because of an error in wagmi 2.1._

## License

This project is licensed under the MIT License:

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
