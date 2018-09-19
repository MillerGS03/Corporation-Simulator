using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace apMenus
{
    public partial class frmPrincipal : Form
    {
        public frmPrincipal()
        {
            InitializeComponent();
        }

        private void btnEstatisticas_Click(object sender, EventArgs e)
        {

        }

        private void btnConstrucao_Click(object sender, EventArgs e)
        {
            new FrmConstrucao().Show();
        }
    }
}
