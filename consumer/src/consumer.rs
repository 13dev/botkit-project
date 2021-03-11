use hyper::client::{HttpConnector, ResponseFuture};
use hyper::{Client, Response, Body, Uri, Method, Request};
use std::str::FromStr;
use core::result;
use std::error::Error;
use crate::endpoints::Endpoint;

type Result<T> = result::Result<T, Box<dyn Error + Send + Sync>>;

const API: &str = "http://ws01.inmadeira.com/qualidade/v5/gst/Expedita.WS.GesTools.Processes/processes.asmx";

pub struct Consumer {
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