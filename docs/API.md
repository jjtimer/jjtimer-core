Core API
========

### Event

### Timer

### Session
- reset: Clear the session.
- add(solve): Add the solve to the session.
- delete(index): Delete the solve at the *index*.
- toggle_dnf(index): Toggle the DNF status of the solve at the *index*.
- toggle_plus2(index): Toggle the +2 status of the solve at the *index*.
- average(start, length): Returns the average of the solves starting from *start* and ending at *start+length*.

### Storage
The storage API is not implemented in the core, it is just an interface for the clients to implement.
