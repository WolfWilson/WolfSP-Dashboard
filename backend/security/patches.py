"""
Este archivo contiene parches para solucionar problemas de compatibilidad con ciertas bibliotecas.
"""

def patch_passlib_bcrypt():
    """
    Parche para bcrypt y passlib.
    Soluciona el problema con versiones nuevas de bcrypt (4.x) que no tienen
    el atributo __about__.__version__ que passlib intenta acceder.
    """
    try:
        # Importamos los módulos necesarios
        import bcrypt
        import passlib.handlers.bcrypt
        import types
        import sys
        
        # Detectamos la versión de bcrypt
        if hasattr(bcrypt, "__version__"):
            version = bcrypt.__version__
        else:
            # Si bcrypt no tiene __version__, intentamos obtener la versión de otra manera
            try:
                import pkg_resources
                version = pkg_resources.get_distribution('bcrypt').version
            except:
                # Si todo falla, usamos la versión como string
                version = "4.0.0"  # Versión predeterminada si no se puede detectar
                
        print(f"Versión de bcrypt detectada: {version}")
        
        # Creamos y asignamos el módulo __about__ con __version__ si no existe
        if not hasattr(bcrypt, "__about__"):
            # Crear un módulo simulado para __about__
            about_module = types.ModuleType("bcrypt.__about__")
            # Agregar el atributo __version__ al módulo
            about_module.__version__ = version
            # Asignar el módulo simulado como atributo de bcrypt
            bcrypt.__about__ = about_module
            
            # Monkey-patch sys.modules para que passlib pueda encontrar el módulo
            sys.modules['bcrypt.__about__'] = about_module
            
        print("Parche de bcrypt aplicado correctamente")
    except ImportError as e:
        print(f"No se pudo importar bcrypt o passlib: {e}")
    except Exception as e:
        print(f"(trapped) error al aplicar el parche para bcrypt: {e}")
