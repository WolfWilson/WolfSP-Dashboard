from typing import Dict, List, Any, Optional
from pydantic import BaseModel, Field

class ReportParameter(BaseModel):
    """Schema for a report parameter."""
    name: str
    value: Any

class ReportExecutionRequest(BaseModel):
    """Schema for a report execution request."""
    internalID: str = Field(..., description="Internal ID of the report")
    params: List[ReportParameter] = Field(..., description="Parameters for the report")

class ErrorResponse(BaseModel):
    """Schema for an error response."""
    detail: str

class SuccessResponse(BaseModel):
    """Schema for a success response."""
    message: str

class ReportResultResponse(BaseModel):
    """Schema for a report result response."""
    columns: List[str]
    data: List[Dict[str, Any]]
    totalRows: int
    executionTime: float
    
class UserCredentials(BaseModel):
    """Schema for user login credentials."""
    username: str
    password: str
