use serde::Serialize;
use serde::Deserialize;

#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
pub(crate) struct ResponseFilterListBody {
    #[serde(rename = "filter")]
    pub(crate) filter: i8,

    #[serde(rename = "code")]
    pub(crate) code: String,

    #[serde(rename = "jtStartIndex")]
    pub(crate) start_index: i16,

    #[serde(rename = "jtPageSize")]
    pub(crate) page_size: i16,

    #[serde(rename = "jtSorting")]
    pub(crate) sorting: String,

    pub token: String,
}
