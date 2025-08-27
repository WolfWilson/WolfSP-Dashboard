import json
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, status

from security.auth_handler import get_current_active_user, User
from services.report_service import ReportService
from schemas.report_schemas import ReportExecutionRequest, ReportResultResponse, ErrorResponse
from core.config import get_config

router = APIRouter(prefix="/api/reports", tags=["reports"])

@router.get("/config")
async def get_reports_config(current_user: User = Depends(get_current_active_user)) -> List[Dict[str, Any]]:
    """
    Get the reports configuration.
    """
    return get_config()

@router.post("/execute", response_model=ReportResultResponse)
async def execute_report(
    request: ReportExecutionRequest, 
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Execute a report with the given parameters.
    """
    # Convert parameters list to dictionary
    params_dict = {param.name: param.value for param in request.params}
    
    # Execute the report
    result, error = ReportService.execute_report(request.internalID, params_dict)
    
    if error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error
        )
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error executing report"
        )
    
    return result

@router.get("/datasource/{source_name}")
async def get_data_source(
    source_name: str, 
    current_user: User = Depends(get_current_active_user)
) -> List[Dict[str, Any]]:
    """
    Get data for a dynamic data source.
    """
    # Get data from the service
    data = ReportService.get_data_source(source_name)
    
    return data
