package errortypes

import "errors"


var ErrSmtpfromaddr = errors.New("error: failed to set FROM address")
var ErrSmtptoaddr = errors.New("error: failed to set TO address")
var ErrSmtpmailclient = errors.New("error: failed to create mail client")
var ErrSmtpdialclient = errors.New("error: failed to send mail")
