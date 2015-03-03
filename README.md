# Martian Robots

The solution to a coding challenge.

## Node version

v0.12.0


## Input

The solution takes the input via the body of an HTTP request.

The server runs on port 8080.

Example using [superagent][superagent] to make a request to the running server:

    superagent
          .post('http://localhost:8080/')
          .send([
            '5 3',
            '1 1 E',
            'RFRFRFRF',
            '',
            '3 2 N',
            'FRRFLLFFRRFLL',
            '',
            '0 3 W',
            'LLFFFLFLFL',
            ''
          ].join('\n')).end(function(error, res) {
            if(error) throw error
            console.log(res.text)
          })

Example using curl

    curl http://localhost:8080/ -X POST --data-binary @test.txt

where `test.txt` is a file containing input data.


## Output

The output is provided as the body of the HTTP response.


## Set up

    npm install


## Starting the server

    npm start


## Running the tests

    npm test


## Style Note

On my own projects I do not terminate my statements with a semi-colon unless it is necessary,
but am comfortable doing so on projects where it is the convention.


## After Running Out of Time

Implementing as far as this working solution took me over the 2 hours, so I'm including
a list of the minimal things that I would normally do to finish the code off:

1. Introduce more end to end test cases, in particular:
    - going off the grid in other directions.
    - going off the grid at the same point as a previous robot, but in a different direction.
    - different grid sizes.
2. Factor out the individual streams from `processInstructions` into their own modules
   (to make them easier to test and reuse).
3. Eliminate the `RobotInstruction` module, because it's not adding any value and could be
   replaced with an array.
4. Introduce unit tests for each of the modules to help with debugging, refactoring and maintenance.
5. Introduce logging and error handling to help with debugging and to help make the code more robust.
6. Move the hardcoded port value to a command line switch so that that the application can be deployed more easily.
7. Add input validation


<!-- References -->
[superagent]: http://visionmedia.github.io/superagent/