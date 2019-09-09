## Memory Palace

A project for CMU 60-424 Data Gardens, fall 2019

### Usage

Enter `house` from command line, can do: 

- Execute any script, optionally with argument `left`, `right`, `ahead` or `back`
- Run `cd .<location>` where `<location>` appears as something in the output of any script, but in square brackets. For example, if there's a script that outputs `You see a [door].`, then you could do, `cd .door`.

Should supposedly not need to `cd ..` or `ls -a` to navigate through the entire space. The script outputs contain enough information.
