use core::fmt;

#[derive(Debug)]
pub enum Endpoint {
    RequestFilteredList,
}

impl fmt::Display for Endpoint {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        fmt::Debug::fmt(self, f)
    }
}
