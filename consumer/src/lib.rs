mod consumer;
mod endpoints;
mod objects;

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
use std::str;
use crate::objects::ResponseFilterListBody;
use crate::consumer::Consumer;
use crate::endpoints::Endpoint;

use hyper::{body};
use dotenv::dotenv;

use hyper::body::{Bytes, Buf};
use serde::Serialize;
use tokio::task::spawn_local;


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



#[wasm_bindgen]
pub fn post_filter_list() -> String {
    // let params = ResponseFilterListBody {
    //     filter: 0,
    //     code: String::new(),
    //     start_index: 0,
    //     page_size: 10,
    //     sorting: String::from("__int__ID DESC"),
    //     token: String::from(dotenv!("TOKEN")),
    // };
    //
    // let consumer = Consumer::new();
    //
    // spawn_local(async move {
    //     let mut response = consumer
    //         .post(Endpoint::RequestFilteredList, Body::from(serde_json::to_string( &ResponseFilterListBody {
    //             filter: 0,
    //             code: String::new(),
    //             start_index: 0,
    //             page_size: 10,
    //             sorting: String::from("__int__ID DESC"),
    //             token: String::from(dotenv!("TOKEN")),
    //         }).unwrap()))
    //         .await
    //         .expect("Cant get Response.");
    //
    //     let mut body = body::to_bytes(response.body_mut())
    //         .await
    //         .expect("Cant convert response to bytes.")
    //         .reader();
    // });



    // let data: ResponseFilterListBody = serde_json::from_reader(body)
    //     .expect("Cant Deserialize the content.");

    serde_json::to_string( &ResponseFilterListBody {
        filter: 0,
        code: String::new(),
        start_index: 0,
        page_size: 10,
        sorting: String::from("__int__ID DESC"),
        token: String::from(dotenv!("TOKEN")),
    }).unwrap()
}

#[cfg(test)]
mod tests {
    use hyper::{Body, body};
    use dotenv::dotenv;
    use crate::endpoints::Endpoint;
    use crate::consumer::Consumer;
    use hyper::body::{Bytes, Buf};
    use serde::Serialize;
    use crate::objects::ResponseFilterListBody;


    #[tokio::test]
    async fn check_filtered_list() {
        let params = &ResponseFilterListBody {
            filter: 0,
            code: String::new(),
            start_index: 0,
            page_size: 10,
            sorting: String::from("__int__ID DESC"),
            token: String::from(dotenv!("TOKEN")),
        };

        let consumer = Consumer::new();

        let mut response = consumer
            .post(Endpoint::RequestFilteredList, Body::from(serde_json::to_string(params).unwrap()))
            .await
            .expect("Cant get Response.");

        let mut body = body::to_bytes(response.body_mut())
            .await
            .expect("Cant convert response to bytes.")
            .reader();

        let data: ResponseFilterListBody = serde_json::from_reader(body)
            .expect("Cant Deserialize the content.");

        println!("{:?}",data.token);
        assert_eq!(data.token, "fsdfsd");
    }
}
