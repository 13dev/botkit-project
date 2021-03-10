use wasm_bindgen::prelude::*;
use hyper::{body::HttpBody as _, Client, Uri, Response, Body, Request, Method};
use hyper::client::HttpConnector;
use std::error::Error;
use std::result;
use std::fmt::{Display, Formatter};
use core::fmt;
use std::borrow::Borrow;

type Result<T> = result::Result<T, Box<dyn Error + Send + Sync>>;

const API: &str = "https://ws01.inmadeira.com/qualidade/v5/gst/Expedita.WS.GesTools.Processes/processes.asmx/";

#[derive(Debug)]
enum Endpoint {
    RequestFilteredList,
}
impl fmt::Display for Endpoint {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        fmt::Debug::fmt(self, f)
    }
}

struct Consumer {
    client: Client<HttpConnector>,
}



impl Consumer {
    pub fn new() -> Self {
        let client = Client::new();

        Self {
            client,
        }
    }

    pub async fn get_request(&self) -> Response<Body> {
        self.client.get(Uri::from_static(API))
            .await
            .expect("Error making a request.")
    }


    // pub fn post_request(&self, request: Request<>) -> Response<Body> {
    //     self.client.request()
    //         .await
    //         .expect("Error making a request.")
    // }
}


// pub fn build_uri<'a>(endpoint: &'a Endpoint) -> &'a Uri {
//     let buf = &format!("{}", API);
//     &Uri::from_static(buf.as_ref())
// }

pub fn main() -> Result<Body> {

    //println!("{}", build_uri(&Endpoint::RequestFilteredList));

    //let consumer= Consumer::new();

    let req = Request::builder()
        .method(Method::POST)
        .uri(format!("{}/{}", API, Endpoint::RequestFilteredList))
        .header("content-type", "application/json")
        .body(Body::from(r#"{
            "filter": 1,
            "code": "",
            "jtStartIndex": 0,
            "jtPageSize": 10,
            "jtSorting": "__int__ID DESC",
            "token": ""
            }
            "#)
        )?;

    Ok(req)

//     let client = Client::new();
//
// // Make a GET /ip to 'http://httpbin.org'
//     let res = client.get().await?;
//
// // And then, if the request gets a response...
//     println!("status: {}", res.status());
//
// // Concatenate the body stream into a single buffer...
//     let buf = hyper::body::to_bytes(res).await?;
//
//     println!("body: {:?}", buf);
}


#[wasm_bindgen]
pub fn say(s: String) -> String {

    let r = String::from("hello ");
    return r + &s;
}

#[cfg(test)]
mod tests {
    use crate::{Endpoint, main};

    #[test]
     fn check_authentication_response() {
        let response = main().unwrap();
        println!("{:?}", response);
        assert_eq!(2 + 2, 4);
    }
}
