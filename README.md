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

[R] [number] [X] [number]
--------------------------------
[R] [number] [Y] [number]
--------------------------------
[R] [number] [Z] [number]
--------------------------------
Rotate the qubit around the x-axis, y-axis or z-axis (Rx/Ry/Rz gate).
The number following [X]/[Y]/[Z] is rotation radian par pi.

[C] number [R] [number] [X] [number]
-----------------------------------------------
[C] number [R] [number] [Y] [number]
-----------------------------------------------
[C] number [R] [number] [Z] [number]
-----------------------------------------------
Controlled rotation gate ( Controlled-Rx, Controlled-Ry, Controlled-Rz gate).

[C] number [C] number [R] [number] [X] [number]
--------------------------------------------------------------
[C] number [C] number [R] [number] [Y] [number]
--------------------------------------------------------------
[C] number [C] number [R] [number] [Z] [number]
--------------------------------------------------------------
Double controlled rotation gate ( Double controlled-Rx, Double controlled-Ry, Double controlled-Rz gate).

[RESET]
-----------
Reset quantum status as unit.

[CLEAR]
----------
Clear the command.

[=]
----
Execute command.
