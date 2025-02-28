package errortypes

import "errors"

var ErrWsupgrade = errors.New("error: something went wrong while trying to upgrate http server to websocket server by gorilla/websocket")

var ErrWsreadmessage = errors.New("error: something went wrong while trying to read message from the client")

var ErrWswritemessage = errors.New("error: something went wrong while trying to write message back to the client")
