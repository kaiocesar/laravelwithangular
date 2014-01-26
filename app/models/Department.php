<?php
/**
 *	Department Model
 *	@todo Modelo de tabela de banco de dados <departments>
 *	@author Kaio Cesar <programador.kaio@gmail.com>
 */

class Department extends Eloquent
{

	/**
	 *	@var $table string <table name>
	 */
	protected $table = "departments";


	/**
	 *	department
	 *	@todo Função de relacionamento com a table "departments"
	 *	@return object
	 */
	public function product() 
	{
		return $this->hasMany('Product');
	}


}