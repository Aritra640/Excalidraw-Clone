package errortypes

import "errors"


var ErrDburlnotfound = errors.New("error: Db url not found in .env")
