#[macro_use]
extern crate dotenv_codegen;

use wasm_bindgen::prelude::*;
use hyper::{body::HttpBody as _, Client, Uri, Response, Body, Request, Method};
use hyper::client::{HttpConnector, ResponseFuture};
use std::error::Error;
use std::result;
use std::fmt::{Display, Formatter};
use core::fmt;
use std::borrow::Borrow;
use std::ops::Deref;
use std::str::FromStr;

type Result<T> = result::Result<T, Box<dyn Error + Send + Sync>>;

const API: &str = "http://ws01.inmadeira.com/qualidade/v5/gst/Expedita.WS.GesTools.Processes/processes.asmx";

#[derive(Debug)]
pub enum Endpoint {
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

    pub async fn get(&self) -> Response<Body> {
        self.client.get(Uri::from_static(API))
            .await
            .expect("Error making a request.")
    }

    fn build_uri(endpoint: Endpoint) -> Uri {
        Uri::from_str(
            format!("{}/{}", API, endpoint).as_str()
        ).unwrap()
    }

    pub fn post(&self, endpoint: Endpoint, body: Body) -> ResponseFuture {
        let request = Request::builder()
            .method(Method::POST)
            .uri(Self::build_uri(endpoint))
            .header("content-type", "application/json")
            .body(body)
            .unwrap();

        self.client.request(request)
    }
}

pub fn main() {

    //println!("{}", build_uri(&Endpoint::RequestFilteredList));

    //let consumer= Consumer::new();

    // let req = Request::builder()
    //     .method(Method::POST)
    //     .uri(format!("{}/{}", API, Endpoint::RequestFilteredList))
    //     .header("content-type", "application/json")
    //     .body(Body::from(r#"{
    //         "filter": 1,
    //         "code": "",
    //         "jtStartIndex": 0,
    //         "jtPageSize": 10,
    //         "jtSorting": "__int__ID DESC",
    //         "token": ""
    //         }
    //         "#)
    //     )?;

    // Ok(req)

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
    use crate::{Consumer, Endpoint};
    use hyper::Body;
    use dotenv::dotenv;


    #[tokio::test]
    async fn check_authentication_response() {
        println!("{}",dotenv!("TOKEN"));
        let post = Consumer::new();
        let response = post.post(
            Endpoint::RequestFilteredList,
            Body::from(r#"{
                  "filter": 1,
                  "code": "",
                  "jtStartIndex": 0,
                  "jtPageSize": 10,
                  "jtSorting": "__int__ID DESC",
                  "token": "{token}"
                  }"#),
        );

        println!("{:?}", response.await.unwrap());
        assert_eq!(2 + 2, 4);
    }
}
