UNITARY MINI
=============

UNITARY MINI the unitary transformation calculator for quantum computation.

https://tadashi9e.github.io/unitary_mini/unitary_mini.html

Requirement
==========

Web-brower which enabled JavaScript.

Supported Operators
================

[H] [number]
----------------

Hadamard gate

[X] [number]
----------------

Pauli-X gate

[C]  [number] [X] [number]
---------------------------------

Controlled Pauli-X gate

[C]  [number] [C]  [number] [X] [number]
---------------------------------

Double controlled Pauli-X gate

[Y] [number]
----------------

Pauli-Y gate

[C] [number] [Y] [number]
--------------------------------

Controlled Pauli-Y gate

[C] [number] [C] [number] [Y] [number]
-------------------------------------------------

Double controlled Pauli-Y gate

[Z] [number]
----------------
Pauli-Z gate

[C] [number] [Z] [number]
--------------------------------
Controlled Pauli-Z gate

[C] [number] [C] [number] [Z] [number]
-------------------------------------------------
Double controlled Pauli-Z gate

[R] [number] [Z] [number]
--------------------------------
Phase shift gate. The number following [Z] is phase (radian par pi).

[C] number [R] [number] [Z] [number]
-----------------------------------------------
Controlled phase shift gate.

[C] number [C] number [R] [number] [Z] [number]
--------------------------------------------------------------
Double controlled phase shift gate.

[RESET]
-----------
Reset quantum status as |0>.

[CLEAR]
----------
Clear the command.

[=]
----
Execute command.
