use serde::{Deserialize, Serialize};

const MAX_I32: usize = i32::MAX as usize;

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct UsizeWrapper(usize);

impl From<usize> for UsizeWrapper {
    fn from(value: usize) -> Self {
        Self(value)
    }
}

impl From<UsizeWrapper> for i32 {
    fn from(value: UsizeWrapper) -> Self {
        match value.0 {
            0..=MAX_I32 => value.0 as i32,
            _ => i32::MAX
        }
    }
}