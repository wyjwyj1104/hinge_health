## Endpoints

### Create Root Animal

- POST http://localhost:3001/api/tree
- Body:
  > > parent: ObjectId (optional, default null)
  > > > label: String (required, default "")

```
{
    "label":"root"
}
```

- Response: JSON

```
{
    "result": {
        "_id": "63e0a5d3ba34b502efa10cb8",
        "label": "root",
        "parent": null,
        "__v": 0
    }
}
 }
```

### Create Child Animal

- POST http://localhost:3001/api/tree
- Body:
  > > parent: ObjectId (optional, default null)
  > > > label: String (required, default "")

```
{
    "parent":"63e0a5d3ba34b502efa10cb8",
    "label":"node-1"
}
```

- Response: JSON

```
{
    "result": {
        "_id": "63e0a5e9ba34b502efa10cb9",
        "label": "node-1",
        "parent": "63e0a5d3ba34b502efa10cb8",
        "__v": 0
    }
}
```

### Get Tree

- GET http://localhost:3001/api/tree

- Response: Nested JSON

```
[
    {
        "63e0aa5776198803a8abd743": {
            "label": "root",
            "children": [
                {
                    "63e0aa5e76198803a8abd744": {
                        "label": "node-1",
                        "children": [
                            {
                                "63e0ae890c3ee5044cd54b85": {
                                    "label": "node-1-1",
                                    "children": []
                                }
                            },
                            {
                                "63e0ae8b0c3ee5044cd54b86": {
                                    "label": "node-1-2",
                                    "children": []
                                }
                            },
                            {
                                "63e0ae8e0c3ee5044cd54b87": {
                                    "label": "node-1-3",
                                    "children": [
                                        {
                                            "63e0ae940c3ee5044cd54b88": {
                                                "label": "node-1-3-1",
                                                "children": [
                                                    {
                                                        "63e0ae990c3ee5044cd54b89": {
                                                            "label": "node-1-3-1-1",
                                                            "children": []
                                                        }
                                                    },
                                                    {
                                                        "63e0ae9b0c3ee5044cd54b8a": {
                                                            "label": "node-1-3-1-2",
                                                            "children": []
                                                        }
                                                    },
                                                    {
                                                        "63e0ae9d0c3ee5044cd54b8b": {
                                                            "label": "node-1-3-1-3",
                                                            "children": [
                                                                {
                                                                    "63e0aea20c3ee5044cd54b8c": {
                                                                        "label": "node-1-3-1-3-1",
                                                                        "children": []
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    "63e0aa6376198803a8abd745": {
                        "label": "node-2",
                        "children": [
                            {
                                "63e0aa6a76198803a8abd746": {
                                    "label": "node-2-1",
                                    "children": []
                                }
                            },
                            {
                                "63e0aa6d76198803a8abd747": {
                                    "label": "node-2-2",
                                    "children": [
                                        {
                                            "63e0ae770c3ee5044cd54b82": {
                                                "label": "node-2-2-1",
                                                "children": []
                                            }
                                        },
                                        {
                                            "63e0ae790c3ee5044cd54b83": {
                                                "label": "node-2-2-2",
                                                "children": []
                                            }
                                        },
                                        {
                                            "63e0ae7b0c3ee5044cd54b84": {
                                                "label": "node-2-2-3",
                                                "children": []
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
]
```
