mod consumer;
mod endpoints;

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
use serde::Serialize;
use serde::Deserialize;
use std::str;


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
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
struct RequestFilterListBody<'a> {
    #[serde(rename = "filter")]
    filter: i8,

    #[serde(rename = "code")]
    code: String,

    #[serde(rename = "jtStartIndex")]
    start_index: i16,

    #[serde(rename = "jtPageSize")]
    page_size: i16,

    #[serde(rename = "jtSorting")]
    sorting: String,

    pub token: &'a str,
}

#[wasm_bindgen]
pub fn say(s: String) -> String {
    let r = String::from("hello ");
    return r + &s;
}

#[cfg(test)]
mod tests {
    use hyper::Body;
    use dotenv::dotenv;
    use crate::endpoints::Endpoint;
    use crate::RequestFilterListBody;
    use crate::consumer::Consumer;
    use hyper::body::Bytes;
    use serde::Serialize;


    #[tokio::test]
    async fn check_filtered_list() {
        let params = &RequestFilterListBody {
            filter: 0,
            code: String::new(),
            start_index: 0,
            page_size: 10,
            sorting: String::from("__int__ID DESC"),
            token: dotenv!("TOKEN"),
        };

        let response = Consumer::new().post(
            Endpoint::RequestFilteredList,
            Body::from(serde_json::to_string(params).unwrap()),
        );
        let mut body = response.await.unwrap().into_body();

        //let resp: Bytes = hyper::body::to_bytes(body).await.unwrap();

        // let resp = Bytes::from(r#"{
        //      "filter": 1,
        //      "code": "",
        //      "jtStartIndex": 0,
        //      "jtPageSize": 10,
        //      "jtSorting": "__int__ID DESC",
        //      "token": "fsdfsd"
        //      }
        //      "#).to_vec();


        let mut content = String::from_utf8(resp)
            .expect("Error convert bytes to string");

        let data =  serde_json::from_str::<RequestFilterListBody>(&content.as_str())
            .expect("Cant Deserialize the content.");

        println!("{:?}",data.token);
        assert_eq!(data.token, "fsdfsd");
    }
}
