function is_1(state, n) {
    return (state & (1 << n)) != 0 ? true : false;
}
function set_1(state, n) {
    return state | (1 << n);
}
function set_0(state, n) {
    return state & ~(1 << n);
}
function bits_of(state) {
    var s = "";
    for (var n = 0;n <= max_bit; n++) {
        s += is_1(state, n) ? "1" : "0";
    }
    return s;
}
function add(a, b) {
    return [a[0]+b[0], a[1]+b[1]];
}
function mult(a, b) {
    return [a[0]*b[0] -  a[1]*b[1], a[0]*b[1] +  a[1]*b[0]];
}
function m_add(m, state, a) {
    if (!a || (a[0] == 0.0 && a[1] == 0.0)) {
        return;
    }
    if (m[state]) {
        var a2 = add(m[state], a);
        if (a2[0] == 0.0 && a2[1] == 0.0) {
            delete m[state];
            return;
        }
        m[state] = add(m[state], a);
    } else {
        m[state] = a;
    }
}
function op_h(avs2, avs, n) {
    var w = Math.sqrt(0.5);
    for (var state in avs) {
        var a = avs[state];
        if (is_1(state, n)) {
            m_add(avs2, set_0(state, n), mult(a, [w, 0.0]));
            m_add(avs2, set_1(state, n), mult(a, [-w, 0.0]));
        } else {
            m_add(avs2, set_0(state, n), mult(a, [w, 0.0]));
            m_add(avs2, set_1(state, n), mult(a, [w, 0.0]));
        }
    }
}
function op_ch(avs2, avs, c, n) {
    var w = Math.sqrt(0.5);
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c)) {
            m_add(avs2, state, a);
            continue;
        }
        if (is_1(state, n)) {
            m_add(avs2, set_0(state, n), mult(a, [w, 0.0]));
            m_add(avs2, set_1(state, n), mult(a, [-w, 0.0]));
        } else {
            m_add(avs2, set_0(state, n), mult(a, [w, 0.0]));
            m_add(avs2, set_1(state, n), mult(a, [w, 0.0]));
        }
    }
}
function op_cch(avs2, avs, c1, c2, n) {
    var w = Math.sqrt(0.5);
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c1)) {
            m_add(avs2, state, a);
            continue;
        }
        if (!is_1(state, c2)) {
            m_add(avs2, state, a);
            continue;
        }
        if (is_1(state, n)) {
            m_add(avs2, set_0(state, n), mult(a, [w, 0.0]));
            m_add(avs2, set_1(state, n), mult(a, [-w, 0.0]));
        } else {
            m_add(avs2, set_0(state, n), mult(a, [w, 0.0]));
            m_add(avs2, set_1(state, n), mult(a, [w, 0.0]));
        }
    }
}
function op_x(avs2, avs, n) {
    for (var state in avs) {
        var a = avs[state];
        var state2 = is_1(state, n) ?set_0(state, n) : set_1(state, n);
        m_add(avs2, state2, a);
    }
}
function op_cx(avs2, avs, c, n) {
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c)) {
            m_add(avs2, state, a);
            continue;
        }
        var state2 = is_1(state, n) ?set_0(state, n) : set_1(state, n);
        m_add(avs2, state2, a);
    }
}
function op_ccx(avs2, avs, c1, c2, n) {
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c1)) {
            m_add(avs2, state, a);
            continue;
        }
        if (!is_1(state, c2)) {
            m_add(avs2, state, a);
            continue;
        }
        var state2 = is_1(state, n) ?set_0(state, n) : set_1(state, n);
        m_add(avs2, state2, a);
    }
}
function op_y(avs2, avs, n) {
    for (var state in avs) {
        var a = avs[state];
        if (is_1(state, n)) {
            m_add(avs2, set_0(state, n), mult(a, [0.0, -1.0]));
        } else {
            m_add(avs2, set_1(state, n), mult(a, [0.0, 1.0]));
        }
    }
}
function op_cy(avs2, avs, c, n) {
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c)) {
            m_add(avs2, state, a);
            continue;
        }
        if (is_1(state, n)) {
            m_add(avs2, set_0(state, n), mult(a, [0.0, -1.0]));
        } else {
            m_add(avs2, set_1(state, n), mult(a, [0.0, 1.0]));
        }
    }
}
function op_ccy(avs2, avs, c1, c2, n) {
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c1)) {
            m_add(avs2, state, a);
            continue;
        }
        if (!is_1(state, c2)) {
            m_add(avs2, state, a);
            continue;
        }
        if (is_1(state, n)) {
            m_add(avs2, set_0(state, n), mult(a, [0.0, -1.0]));
        } else {
            m_add(avs2, set_1(state, n), mult(a, [0.0, 1.0]));
        }
    }
}
function op_z(avs2, avs, n) {
    for (var state in avs) {
        var a = avs[state];
        if (is_1(state, n)) {
            m_add(avs2, state, mult(a, [-1.0, 0.0]));
        } else {
            m_add(avs2, state, a);
        }
    }
}
function op_cz(avs2, avs, c, n) {
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c)) {
            m_add(avs2, state, a);
            continue;
        }
        if (is_1(state, n)) {
            m_add(avs2, state, mult(a, [-1.0, 0.0]));
        } else {
            m_add(avs2, state, a);
        }
    }
}
function op_ccz(avs2, avs, c1, c2, n) {
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c1)) {
            m_add(avs2, state, a);
            continue;
        }
        if (!is_1(state, c2)) {
            m_add(avs2, state, a);
            continue;
        }
        if (is_1(state, n)) {
            m_add(avs2, state, mult(a, [-1.0, 0.0]));
        } else {
            m_add(avs2, state, a);
        }
    }
}
function rot_x(avs2, state, a, n, r) {
    var rot00 = [Math.cos(0.5 * r * Math.PI), 0.0];
    var rot01 = [0.0, -Math.sin(0.5 * r * Math.PI)];
    var rot10 = rot01;
    var rot11 = rot00;
    if (is_1(state, n)) {
        m_add(avs2, set_0(state, n), mult(a, rot10));
        m_add(avs2, set_1(state, n), mult(a, rot11));
    } else {
        m_add(avs2, set_0(state, n), mult(a, rot00));
        m_add(avs2, set_1(state, n), mult(a, rot01));
    }
}
function rot_y(avs2, state, a, n, r) {
    var rot00 = [Math.cos(0.5 * r * Math.PI), 0.0];
    var rot01 = [Math.sin(0.5 * r * Math.PI), 0.0];
    var rot10 = [-Math.sin(0.5 * r * Math.PI), 0.0];
    var rot11 = rot00;
    if (is_1(state, n)) {
        m_add(avs2, set_0(state, n), mult(a, rot10));
        m_add(avs2, set_1(state, n), mult(a, rot11));
    } else {
        m_add(avs2, set_0(state, n), mult(a, rot00));
        m_add(avs2, set_1(state, n), mult(a, rot01));
    }
}
function rot_z(avs2, state, a, n, r) {
    var rot00 = [Math.cos(0.5 * r * Math.PI), -Math.sin(0.5 * r * Math.PI)];
    var rot11 = [Math.cos(0.5 * r * Math.PI), Math.sin(0.5 * r * Math.PI)];
    if (is_1(state, n)) {
        m_add(avs2, set_1(state, n), mult(a, rot11));
    } else {
        m_add(avs2, set_0(state, n), mult(a, rot00));
    }
}
function rot(avs2, state, a, n, d, r) {
    if (d == "X") {
        rot_x(avs2, state, a, n, r);
    }
    if (d == "Y") {
        rot_y(avs2, state, a, n, r);
    }
    if (d == "Z") {
        rot_z(avs2, state, a, n, r);
    }
}
function op_r(avs2, avs, n,  d, r) {
    for (var state in avs) {
        var a = avs[state];
        rot(avs2, state, a, n, d, r);
    }
}
function op_cr(avs2, avs, c, n, d, r) {
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c)) {
            m_add(avs2, state, a);
            continue;
        }
        rot(avs2, state, a, n, d, r);
    }
}
function op_ccr(avs2, avs, c1, c2, n, d, r) {
    for (var state in avs) {
        var a = avs[state];
        if (!is_1(state, c1)) {
            m_add(avs2, state, a);
            continue;
        }
        if (!is_1(state, c2)) {
            m_add(avs2, state, a);
            continue;
        }
        rot(avs2, state, a, n, d, r);
    }
}
// ----------------------------------------------------------------------
function strOfFloat(f) {
    var r = String(Math.floor(f * 100000000) / 100000000);
    if (r.match(/\./)) {
        return r.replace(/\.?0+$/, "");
    }
    return r;
}
function set_cmd0(text) {
    document.querySelector("#cmd0").value = text;
}
function set_cmd1(text) {
    document.querySelector("#cmd1").value = text;
}
function set_cmd2(text) {
    document.querySelector("#cmd2").value = text;
}
function get_cmd0() {
    return document.querySelector("#cmd0").value;
}
function get_cmd1() {
    return document.querySelector("#cmd1").value;
}
function get_cmd2() {
    return document.querySelector("#cmd2").value;
}
function set_arg0(a) {
    document.querySelector("#arg0").value = a;
}
function set_arg1(a) {
    document.querySelector("#arg1").value = a;
}
function set_arg2(a) {
    document.querySelector("#arg2").value = a;
}
function get_arg0() {
    return document.querySelector("#arg0").value;
}
function get_arg1() {
    return document.querySelector("#arg1").value;
}
function get_arg2(text) {
    return document.querySelector("#arg2").value;
}
function set_cmd(c) {
    if (get_cmd0() === "") {
        set_cmd0(c);
        return;
    }
    if (get_arg0() === "") {
        return;
    }
     if (get_cmd1() === "") {
        set_cmd1(c);
    }
    if (get_arg1() === "") {
        return;
    }
    if (get_cmd2() === "") {
        set_cmd2(c);
    }
}
function get_cmd() {
    var c = get_cmd2();
    if (c) {
        return c;
    }
    var c = get_cmd1();
    if (c) {
        return c;
    }
    var c = get_cmd0();
    if (c) {
        return c;
    }
    return "";
}
function get_arg() {
    var a = get_arg2();
    if (a) {
        return a;
    }
    a = get_arg1();
    if (a) {
        return a;
    }
    return get_arg0();
}
function extend_arg(c) {
    if (get_cmd2()) {
        set_arg2(get_arg2() + c);
    } else if (get_cmd1()) {
        set_arg1(get_arg1() + c);
    } else if (get_cmd0()) {
        set_arg0(get_arg0() + c);
    }
}
function reset_arg(a) {
    if (get_cmd2()) {
        set_arg2(a);
    } else if (get_cmd1()) {
        set_arg1(a);
    } else if (get_cmd0()) {
        set_arg0(a);
    }
}
function get_rot_direction(a) {
    if (a.indexOf("X") !== -1) {
        return "X";
    }
    if (a.indexOf("Y") !== -1) {
        return "Y";
    }
    if (a.indexOf("Z") !== -1) {
        return "Z";
    }
    return "";
}
function set_rot_direction(a, d) {
    var i = a.indexOf("X");
    if (i !== -1) {
        return a.substr(0, i) + d + a.substr(i + 1);
    }
    i = a.indexOf("Y");
    if (i !== -1) {
        return a.substr(0, i) + d + a.substr(i + 1);
    }
    i = a.indexOf("Z");
    if (i !== -1) {
        return a.substr(0, i) + d + a.substr(i + 1);
    }
    return a + d;
}
function get_rot_index(a) {
    var i;
    i = a.indexOf("X");
    if (i !== -1) {
        return i;
    }
    i = a.indexOf("Y");
    if (i !== -1) {
        return i;
    }
    i = a.indexOf("Z");
    if (i !== -1) {
        return i;
    }
    return -1;
}
function get_rot_target(a) {
    var i = get_rot_index(a);
    if (i === -1) {
        return -1;
    }
    return parseInt(a.substring(0, i));
}
function get_rot_angle_raw(a) {
    var i = get_rot_index(a);
    if (i === -1) {
        return "";
    }
    return a.substring(i + 1);
}
function get_rot_angle(a) {
    var s = get_rot_angle_raw(a);
    if (s === "") {
        return 0.0;
    }
    return parseFloat(s);
}
function reset_rot(target, direction, angle) {
    reset_arg(String(target) + direction + String(angle));
}
function set_arg_dot() {
    var c = get_cmd();
    if (c != "R") {
        return;
    }
    var a = get_arg();
    if (get_rot_direction(a) === "") {
        return;
    }
    extend_arg(".");
}
function set_arg_negative() {
    var c = get_cmd();
    if (c != "R") {
        return;
    }
    var a = get_arg();
    var d = get_rot_direction(a);
    var n = get_rot_target(a);
    var r = get_rot_angle_raw(a);
    if (r.match(/-/)) {
        r = r.replace(/-/, "");
    } else {
        r = "-" + r;
    }
    reset_rot(n, d, r);
    update_max_bit(n);
}
function clear_cmd() {
    set_cmd0("");
    set_cmd1("");
    set_cmd2("");
    set_arg0("");
    set_arg1("");
    set_arg2("");
}
var error_msg = "";
function set_error(msg) {
    error_msg = msg + "\n";
}
var max_bit = 0;
var max_states = 2;
var commands = "";
var amps = {
    "0": { "0": [1.0, 0.0]},
    "1": { "1": [1.0, 0.0]} };
function update_max_bit(n) {
    if (max_bit < n) {
        var max_states2 = (1 << (n + 1));
        for (var m = max_states; m < max_states2; m += max_states) {
            for (var i = 0; i < max_states; i += 1) {
                var av = {};
                for (var j = 0; j < max_states; j += 1) {
                    var a = amps[i][j];
                    if (a) {
                        av[m + j] = [a[0], a[1]];
                    }
                }
                amps[m + i] = av;
            }
        }
        max_bit = n;
        max_states = max_states2;
    }
}
function clear_display() {
    var tbody = document.getElementById("display");
    for (var i = tbody.rows.length - 1; i >= 0; i--) {
        tbody.removeChild(tbody.rows[i]);
    }
}
function normalize_vector(avs) {
    var sum = 0.0;
    for (var sv in avs) {
        var a = avs[sv];
        sum = sum + a[0]*a[0] + a[1]*a[1];
    }
    var u = Math.sqrt(sum);
    for (var sv in avs) {
        var a = avs[sv];
        if (a[0] == 0.0 && a[1] == 0.0) {
            continue;
        }
        avs[sv] = [a[0] / u, a[1] / u];
    }
}
function normalize() {
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        normalize_vector(avs);
    }
}
function disp() {
    if (error_msg) {
        document.querySelector("#message").value = error_msg;
    } else {
        document.querySelector("#message").value = commands;
    }
    clear_display();
    normalize();
    var tbody = document.getElementById("display");
    for (var j = 0; j < max_states; j++) {
        var tr = tbody.insertRow(tbody.rows.length);
        for (var i = 0; i < max_states; i++) {
            var amp = amps[i][j];
            var real = amp ? amp[0] : 0.0;
            var imag = amp ? amp[1] : 0.0;
            var td_real = tr.insertCell(i * 2);
            td_real.appendChild(
                document.createTextNode(strOfFloat(real)));
            var td_imag = tr.insertCell(i * 2 + 1);
            if (imag == 0.0) {
                continue;
            }
            if (imag == 1.0) {
                td_imag.appendChild(document.createTextNode("+i"));
            } else if (imag == -1.0) {
                td_imag.appendChild(document.createTextNode("-i"));
            } else {
                if (imag >= 0.0) {
                    td_imag.appendChild(
                        document.createTextNode("+" + strOfFloat(imag) + "i"));
                } else {
                    td_imag.appendChild(
                        document.createTextNode(strOfFloat(imag) + "i"));
                }
            }
        }
    }
    error_msg = "";
}
function reset_cmd() {
    amps = {
        "0": { "0": [1.0, 0.0]},
        "1": { "1": [1.0, 0.0]},
    };
    max_bit = 0;
    max_states = 2;
    commands = "";
    clear_cmd();
    disp();
}
function exec_h(n) {
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_h(avs2, avs, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " H["
        + n + "]";
}
function exec_ch(c, n) {
    update_max_bit(c);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_ch(avs2, avs, c, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CH["
        + c + "," + n + "]";
}
function exec_cch(c1, c2, n) {
    update_max_bit(c1);
    update_max_bit(c2);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_cch(avs2, avs, c1, c2, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CCH["
        + c1 + "," + c2 + "," + n + "]";
}
function exec_x(n) {
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_x(avs2, avs, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " X["
        + n + "]";
}
function exec_cx(c, n) {
    update_max_bit(c);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_cx(avs2, avs, c, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CX["
        + c + "," + n + "]";
}
function exec_ccx(c1, c2, n) {
    update_max_bit(c1);
    update_max_bit(c2);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_ccx(avs2, avs, c1, c2, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CCX["
        + c1 + "," + c2 + "," + n + "]";
}
function exec_y(n) {
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_y(avs2, avs, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " Y["
        + n + "]";
}
function exec_cy(c, n) {
    update_max_bit(c);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_cy(avs2, avs, c, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CY["
        + c + "," + n + "]";
}
function exec_ccy(c1, c2, n) {
    update_max_bit(c1);
    update_max_bit(c2);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_ccy(avs2, avs, c1, c2, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CCY["
        + c1 + "," + c2 + "," + n + "]";
}
function exec_z(n) {
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_z(avs2, avs, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " Z["
        + n + "]";
}
function exec_cz(c, n) {
    update_max_bit(c);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_cz(avs2, avs, c, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CZ["
        +c + "," + n + "]";
}
function exec_ccz(c1, c2, n) {
    update_max_bit(c1);
    update_max_bit(c2);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_ccz(avs2, avs, c1, c2, n);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CCZ["
        + c1 + "," + c2 + "," + n + "]";
}
function exec_r(n_d_r) {
    var n = get_rot_target(n_d_r);
    var d = get_rot_direction(n_d_r);
    var r = get_rot_angle(n_d_r);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_r(avs2, avs, n, d, r);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " R" + d + "["
        + n + "," + r + " *pi" + "]";
}
function exec_cr(c, n_d_r) {
    update_max_bit(c);
    var n = get_rot_target(n_d_r);
    var d = get_rot_direction(n_d_r);
    var r = get_rot_angle(n_d_r);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_cr(avs2, avs, c, n, d, r);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CR" + d + "["
        + c + "," + n + "," + r + " *pi" + "]";
}
function exec_ccr(c1, c2, n_d_r) {
    update_max_bit(c1);
    update_max_bit(c2);
    var n = get_rot_target(n_d_r);
    var d = get_rot_direction(n_d_r);
    var r = get_rot_angle(n_d_r);
    update_max_bit(n);
    var amps2 = {};
    for (var state = 0; state < max_states; state++) {
        var avs = amps[state];
        var avs2 = {};
        op_ccr(avs2, avs, c1, c2, n, d, r);
        amps2[state] = avs2;
    }
    amps = amps2;
    commands = commands + " CCR" + d + "["
        + c1 + "," + c2 + "," + n + "," + r + " *pi" + "]";
}
function exec_cmd_cc(a0, a1) {
    var c2 = get_cmd2();
    var a2 = get_arg2();
    if (a0 == a2 || a1 == a2 || a2 === "") {
        set_error("invalid argument");
        disp();
        return;
    }
    switch(c2) {
    case "H":
        exec_cch(parseInt(a0), parseInt(a1), parseInt(a2));
        break;
    case "X":
        exec_ccx(parseInt(a0), parseInt(a1), parseInt(a2));
        break;
    case "Y":
        exec_ccy(parseInt(a0), parseInt(a1), parseInt(a2));
        break;
    case "Z":
        exec_ccz(parseInt(a0), parseInt(a1), parseInt(a2));
        break;
    case "R":
        exec_ccr(parseInt(a0), parseInt(a1), a2);
        break;
    }
}
function exec_cmd_c(a0) {
    var c1 = get_cmd1();
    var a1 = get_arg1();
    if (a0 == a1 || a1 === "") {
        set_error("invalid argument");
        disp();
        return;
    }
    switch(c1) {
    case "C":
        exec_cmd_cc(parseInt(a0), parseInt(a1));
        break;
    case "H":
        exec_ch(parseInt(a0), parseInt(a1));
        break;
    case "X":
        exec_cx(parseInt(a0), parseInt(a1));
        break;
    case "Y":
        exec_cy(parseInt(a0), parseInt(a1));
        break;
    case "Z":
        exec_cz(parseInt(a0), parseInt(a1));
        break;
    case "R":
        exec_cr(parseInt(a0), a1);
        break;
    }
}
function exec_cmd() {
    var c0 = get_cmd0();
    var a0 = get_arg0();
    if (a0 === "") {
        set_error("invalid argument");
        disp();
        return;
    }
    switch(c0) {
    case "C":
        exec_cmd_c(parseInt(a0));
        break;
    case "H":
        exec_h(parseInt(a0));
        break;
    case "X":
        exec_x(parseInt(a0));
        break;
    case "Y":
        exec_y(parseInt(a0));
        break;
    case "Z":
        exec_z(parseInt(a0));
        break;
    case "R":
        exec_r(a0);
        break;
    }
    disp();
}
function key_in(c) {
    switch(c) {
    case "C":
    case "H":
    case "R":
        var c0 = get_cmd();
        if (c0 === "" || c0 === "C") {
            set_cmd(c);
        } else {
            exec_cmd();
            clear_cmd();
            set_cmd(c);
        }
        break;
    case "X":
    case "Y":
    case "Z":
        var c0 = get_cmd();
        if (c0 === "" || c0 === "C") {
            set_cmd(c);
        } else if (c0 === "R") {
            var a = get_arg();
            if (a) {
                reset_arg(set_rot_direction(a, c));
            }
        } else {
            exec_cmd();
            clear_cmd();
            set_cmd(c);
        }
        break;
    case "M":
        var c1 = get_cmd();
        if (c1 === "") {
            set_cmd(c);
        } else if (c1 != "C") {
            exec_cmd();
            clear_cmd();
            set_cmd(c);
        }
        break;
    case "=":
        exec_cmd();
        clear_cmd();
        break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
        extend_arg(c);
        break;
    case ".":
        set_arg_dot();
        break;
    case "-":
        set_arg_negative();
        break;
    }
}
